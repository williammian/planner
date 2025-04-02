package br.com.wm.planner.service;

import br.com.wm.planner.exception.GenericException;
import br.com.wm.planner.model.Record;
import br.com.wm.planner.repository.RecordCustomRepository;
import br.com.wm.planner.repository.RecordRepository;
import br.com.wm.planner.util.TestUtils;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class RecordServiceTest {

    @InjectMocks
    private RecordService service;
    @Mock
    private RecordRepository repository;
    @Mock
    private RecordCustomRepository customRepository;

    @Test
    void service_mustReturnRecord_whenSaveSuccessfully() {
        Record record = TestUtils.buildValidRecord();

        when(repository.save(any())).thenReturn(record);

        Record rec = service.save(record);

        verify(repository, times(1)).save(record);
        assertNotNull(rec);
    }

    @Test
    void service_mustThrowException_whenErrorOccursOnSave() {
        Record record = TestUtils.buildValidRecord();

        when(repository.save(any())).thenThrow(new RuntimeException("Error"));

        assertThrows(GenericException.class, () -> {
            service.save(record);
        });
    }

    @Test
    void service_mustReturnPage_whenFindSuccessfully() {
        Record record = TestUtils.buildValidRecord();

        when(customRepository.findPaginated(any(), any(), any(), any(), any(), any(), any(), anyInt(), anyInt())).thenReturn(Page.empty());

        Page<Record> page = service.findPaginated(record.getService(), record.getCustomer(), record.getLocation(),
                record.getDateTime().toLocalDate(), record.getDateTime().toLocalDate(), false, false, 0, 10);

        assertNotNull(page);
        assertEquals(page, Page.empty());
    }

    @Test
    void service_mustThrowException_whenErrorOccursOnFind() {
        Record record = TestUtils.buildValidRecord();

        when(customRepository.findPaginated(any(), any(), any(), any(), any(), any(), any(), anyInt(), anyInt()))
                .thenThrow(new RuntimeException("Error"));

        assertThrows(GenericException.class, () -> {
            service.findPaginated(record.getService(), record.getCustomer(), record.getLocation(),
                    record.getDateTime().toLocalDate(), record.getDateTime().toLocalDate(), false, false, 0, 10);
        });
    }
}
