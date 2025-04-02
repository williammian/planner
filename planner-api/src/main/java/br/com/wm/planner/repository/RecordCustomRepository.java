package br.com.wm.planner.repository;

import br.com.wm.planner.model.Record;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public class RecordCustomRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public RecordCustomRepository(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Page<Record> findPaginated(String service, String customer, String location, LocalDate initialDate, LocalDate finalDate,
                                      Boolean canceled, Boolean done, int page, int size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("dateTime").descending());

        MapSqlParameterSource parameterSource = new MapSqlParameterSource();

        Integer totalRecords = count(service, customer, location, initialDate, finalDate, canceled, done, parameterSource);
        List<Record> records = find(service, customer, location, initialDate, finalDate, canceled, done, size, parameterSource, pageRequest);

        return new PageImpl<>(records, pageRequest, totalRecords);
    }

    private List<Record> find(String service, String customer, String location,  LocalDate initialDate, LocalDate finalDate,
                          Boolean canceled, Boolean done, int size, MapSqlParameterSource parameterSource, PageRequest pageRequest) {
        String dataSQL = "SELECT * FROM record WHERE 1 = 1 " + buildWhereClause(service, customer, location, initialDate,
                finalDate, canceled, done, parameterSource) + " ORDER BY date_time DESC LIMIT :limit OFFSET :offset";
        parameterSource.addValue("limit", size);
        parameterSource.addValue("offset", pageRequest.getOffset());
        return jdbcTemplate.query(dataSQL, parameterSource, new BeanPropertyRowMapper<>(Record.class));
    }

    private Integer count(String service, String customer, String location,  LocalDate initialDate, LocalDate finalDate,
                          Boolean canceled, Boolean done, MapSqlParameterSource parameterSource) {
        String countSQL= "SELECT COUNT(*) FROM record WHERE 1 = 1 " + buildWhereClause(service, customer, location, initialDate,
                finalDate, canceled, done, parameterSource);
        Integer total = jdbcTemplate.queryForObject(countSQL, parameterSource, Integer.class);
        return (total != null) ? total : 0;
    }

    private String buildWhereClause(String service, String customer, String location,  LocalDate initialDate, LocalDate finalDate,
                                    Boolean canceled, Boolean done, MapSqlParameterSource parameterSource) {
        StringBuilder whereClause = new StringBuilder();

        if(service != null) {
            whereClause.append(" AND service LIKE :service");
            parameterSource.addValue("service", "%" + service + "%");
        }

        if(customer != null) {
            whereClause.append(" AND customer LIKE :customer");
            parameterSource.addValue("customer", "%" + customer + "%");
        }

        if(location != null) {
            whereClause.append(" AND location LIKE :location");
            parameterSource.addValue("location", "%" + location + "%");
        }

        if(initialDate != null) {
            if(finalDate != null) {
                whereClause.append(" AND date_time BETWEEN :initialDate AND :finalDate");
                parameterSource.addValue("initialDate", initialDate.atStartOfDay());
                parameterSource.addValue("finalDate", finalDate.atTime(LocalTime.MAX));
            }else {
                whereClause.append(" AND date_time BETWEEN :initialDate AND :finalDate");
                parameterSource.addValue("initialDate", initialDate.atStartOfDay());
                parameterSource.addValue("finalDate", LocalDate.now());
            }
        }

        if(done != null) {
            whereClause.append(" AND done = :done");
            parameterSource.addValue("done", done);
        }

        if(canceled != null) {
            whereClause.append(" AND canceled = :canceled");
            parameterSource.addValue("canceled", canceled);
        }

        return whereClause.toString();
    }
}
