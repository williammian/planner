package br.com.wm.planner.controller.converter;

import br.com.wm.planner.controller.dto.RecordDTO;
import br.com.wm.planner.model.Record;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class RecordDTOConverter {
    public RecordDTO convert(Record record) {
        return Optional.ofNullable(record)
                .map(source -> new RecordDTO(
                        source.getId(),
                        source.getService(),
                        source.getCustomer(),
                        source.getLocation(),
                        source.getDateTime(),
                        source.isDone(),
                        source.isCanceled())
                )
                .orElse(null);
    }

    public Record convert(RecordDTO record) {
        return Optional.ofNullable(record)
                .map(source -> Record.builder()
                        .id(source.id())
                        .service(source.service())
                        .customer(source.customer())
                        .location(source.location())
                        .dateTime(source.dateTime())
                        .done(source.done())
                        .canceled(source.canceled())
                        .build()
                )
                .orElse(null);
    }
}
