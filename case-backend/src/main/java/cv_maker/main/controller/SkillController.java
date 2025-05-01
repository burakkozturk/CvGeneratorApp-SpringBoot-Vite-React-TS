package cv_maker.main.controller;

import cv_maker.main.dto.CreateSkillRequest;
import cv_maker.main.dto.SkillResponse;
import cv_maker.main.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillSvc;
    public SkillController(SkillService skillSvc) {
        this.skillSvc = skillSvc;
    }

    @GetMapping
    public ResponseEntity<List<SkillResponse>> list(Authentication auth) {
        UUID userId = UUID.fromString(auth.getName());
        return ResponseEntity.ok(skillSvc.listSkills(userId));
    }

    @PostMapping
    public ResponseEntity<SkillResponse> add(
            Authentication auth,
            @RequestBody CreateSkillRequest req) {
        UUID userId = UUID.fromString(auth.getName());
        return ResponseEntity.ok(skillSvc.addSkill(userId, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            Authentication auth,
            @PathVariable UUID id) {
        UUID userId = UUID.fromString(auth.getName());
        skillSvc.deleteSkill(userId, id);
        return ResponseEntity.noContent().build();
    }
}
