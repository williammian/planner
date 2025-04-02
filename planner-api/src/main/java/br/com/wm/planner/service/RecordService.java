package br.com.wm.planner.service;

import br.com.wm.planner.exception.GenericException;
import br.com.wm.planner.model.Record;
import br.com.wm.planner.repository.RecordCustomRepository;
import br.com.wm.planner.repository.RecordRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@Log4j2
public class RecordService {

    private final RecordRepository repository;
    private final RecordCustomRepository customRepository;

    private static final String SAVE_ERROR = "Error during save record.";
    private static final String FIND_ERROR = "Error during find records.";

    public RecordService(RecordRepository repository,
                         RecordCustomRepository customRepository) {
        this.repository = repository;
        this.customRepository = customRepository;
    }

    public Record save(Record record) {
        try {
            return repository.save(record);
        }catch (Exception ex) {
            log.error(SAVE_ERROR, ex);
            throw new GenericException(SAVE_ERROR);
        }
    }

    public Page<Record> findPaginated(String service, String customer, String location, LocalDate initialDate, LocalDate finalDate, Boolean canceled, Boolean done, int page, int size) {
        try {
            return customRepository.findPaginated(service, customer, location, initialDate, finalDate, canceled, done, page, size);
        }catch (Exception ex) {
            log.error(FIND_ERROR, ex);
            throw new GenericException(FIND_ERROR);
        }
    }
}
