package cv_maker.main.controller;

import cv_maker.main.dto.CreateSocialLinkRequest;
import cv_maker.main.dto.SocialLinkResponse;
import cv_maker.main.service.abstracts.SocialLinkService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/social-links")
public class SocialLinkController {

    private final SocialLinkService svc;
    public SocialLinkController(SocialLinkService svc) {
        this.svc = svc;
    }

    @GetMapping
    public ResponseEntity<List<SocialLinkResponse>> list(Authentication auth) {
        UUID userId = UUID.fromString(auth.getName());
        return ResponseEntity.ok(svc.list(userId));
    }

    @PostMapping
    public ResponseEntity<SocialLinkResponse> add(
            Authentication auth,
            @RequestBody CreateSocialLinkRequest req) {
        UUID userId = UUID.fromString(auth.getName());
        return ResponseEntity.ok(svc.add(userId, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(Authentication auth, @PathVariable UUID id) {
        UUID userId = UUID.fromString(auth.getName());
        svc.delete(userId, id);
        return ResponseEntity.noContent().build();
    }
}
