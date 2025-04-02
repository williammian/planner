package br.com.wm.planner.controller;

import br.com.wm.planner.controller.converter.RecordDTOConverter;
import br.com.wm.planner.controller.dto.RecordDTO;
import br.com.wm.planner.model.Record;
import br.com.wm.planner.repository.RecordCustomRepository;
import br.com.wm.planner.service.RecordService;
import br.com.wm.planner.util.TestUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
public class RecordControllerTest {

    @InjectMocks
    private RecordController controller;

    @Mock
    private RecordService service;

    @Mock
    private RecordDTOConverter converter;
    @Mock
    private RecordCustomRepository customRepository;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void controller_mustReturnOk_whenRequestSaveSuccessfully() throws Exception {
        Record record = TestUtils.buildValidRecord();
        RecordDTO dto = TestUtils.buildValidRecordDTO();

        when(service.save(any())).thenReturn(record);
        when(converter.convert(any(Record.class))).thenReturn(dto);

        mockMvc.perform(post("/record")
                .content(asJsonString(dto))
                .contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(content().string(asJsonString(dto)));
    }

    @Test
    void controller_mustReturnOk_whenRequestFindSuccessfully() throws Exception {
        Record record = TestUtils.buildValidRecord();

        Page<Record> page = new PageImpl<>(List.of(record), PageRequest.of(0, 10), 1);
        when(service.findPaginated(any(), any(), any(), any(), any(), any(), any(), anyInt(), anyInt())).thenReturn(page);

        mockMvc.perform(get("/record")
                    .param("page", "0")
                    .param("size", "10")
                    .contentType("application/json"))
                    .andExpect(status().isOk());
    }

    public static String asJsonString(final Object obj) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.registerModule(new JavaTimeModule());
            return objectMapper.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
