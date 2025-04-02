package br.com.wm.planner.controller.converter;

import br.com.wm.planner.controller.dto.RecordDTO;
import br.com.wm.planner.model.Record;
import br.com.wm.planner.util.TestUtils;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class RecordDTOConverterTest {

    @InjectMocks
    private RecordDTOConverter converter;

    @Test
    void converter_mustReturnRecordDTO_whenConvertSuccessfully() {
        Record record = TestUtils.buildValidRecord();

        RecordDTO dto = converter.convert(record);

        assertEquals(dto.id(), record.getId());
        assertEquals(dto.customer(), record.getCustomer());
        assertEquals(dto.location(), record.getLocation());
        assertEquals(dto.dateTime(), record.getDateTime());
        assertEquals(dto.canceled(), record.isCanceled());
        assertEquals(dto.done(), record.isDone());
    }

    @Test
    void converter_mustReturnRecord_whenConvertSuccessfully() {
        RecordDTO recordDTO = TestUtils.buildValidRecordDTO();

        Record dto = converter.convert(recordDTO);

        assertEquals(dto.getId(), recordDTO.id());
        assertEquals(dto.getCustomer(), recordDTO.customer());
        assertEquals(dto.getLocation(), recordDTO.location());
        assertEquals(dto.getDateTime(), recordDTO.dateTime());
        assertEquals(dto.isCanceled(), recordDTO.canceled());
        assertEquals(dto.isDone(), recordDTO.done());
    }
}
