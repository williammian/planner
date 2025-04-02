package br.com.wm.planner.util;

import br.com.wm.planner.controller.converter.RecordDTOConverter;
import br.com.wm.planner.controller.dto.RecordDTO;
import br.com.wm.planner.model.Record;

import java.time.LocalDateTime;

public class TestUtils {


    public static Record buildValidRecord() {
        return Record.builder()
                .service("Teste")
                .customer("Customer")
                .location("Rua teste")
                .dateTime(LocalDateTime.now())
                .canceled(false)
                .done(false)
                .build();
    }

    public static RecordDTO buildValidRecordDTO() {
        return new RecordDTOConverter()
                .convert(buildValidRecord());
    }
}
