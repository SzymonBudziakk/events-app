package events_app.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/test")
public class TestController {

    @GetMapping
    public String hello() {
        return "Hello World";
    }

    @GetMapping("/test")
    public String test() {
        return "Test";
    }
}
