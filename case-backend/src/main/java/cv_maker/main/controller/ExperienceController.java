package cv_maker.main.controller;

import cv_maker.main.dto.CreateExperienceRequest;
import cv_maker.main.dto.ExperienceResponse;
import cv_maker.main.service.ExperienceService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {

    private final ExperienceService expSvc;
    public ExperienceController(ExperienceService expSvc) {
        this.expSvc = expSvc;
    }

    @GetMapping
    public ResponseEntity<List<ExperienceResponse>> list(Authentication auth) {
        UUID userId = UUID.fromString(auth.getName());
        return ResponseEntity.ok(expSvc.listExperiences(userId));
    }

    @PostMapping
    public ResponseEntity<ExperienceResponse> add(
            Authentication auth,
            @RequestBody CreateExperienceRequest req) {
        UUID userId = UUID.fromString(auth.getName());
        return ResponseEntity.ok(expSvc.addExperience(userId, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            Authentication auth,
            @PathVariable UUID id) {
        UUID userId = UUID.fromString(auth.getName());
        expSvc.deleteExperience(userId, id);
        return ResponseEntity.noContent().build();
    }
}
