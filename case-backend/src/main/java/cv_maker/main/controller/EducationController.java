package cv_maker.main.controller;

import cv_maker.main.dto.CreateEducationRequest;
import cv_maker.main.dto.EducationResponse;
import cv_maker.main.service.EducationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/educations")
public class EducationController {

    private final EducationService eduSvc;
    public EducationController(EducationService eduSvc) {
        this.eduSvc = eduSvc;
    }

    @GetMapping
    public ResponseEntity<List<EducationResponse>> list(Authentication auth) {
        UUID userId = UUID.fromString(auth.getName());
        return ResponseEntity.ok(eduSvc.listEducation(userId));
    }

    @PostMapping
    public ResponseEntity<EducationResponse> add(
            Authentication auth,
            @RequestBody CreateEducationRequest req) {
        UUID userId = UUID.fromString(auth.getName());
        return ResponseEntity.ok(eduSvc.addEducation(userId, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            Authentication auth,
            @PathVariable UUID id) {
        UUID userId = UUID.fromString(auth.getName());
        eduSvc.deleteEducation(userId, id);
        return ResponseEntity.noContent().build();
    }
}
