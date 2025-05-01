package cv_maker.main.controller;

import cv_maker.main.dto.CreateProfileRequest;
import cv_maker.main.dto.ProfileResponse;
import cv_maker.main.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<ProfileResponse> getProfile(Authentication auth) {
        UUID userId = UUID.fromString(auth.getName());
        return ResponseEntity.ok(profileService.getProfile(userId));
    }

    @PostMapping
    public ResponseEntity<ProfileResponse> saveProfile(
            Authentication auth,
            @RequestBody CreateProfileRequest req) {
        UUID userId = UUID.fromString(auth.getName());
        return ResponseEntity.ok(profileService.createOrUpdateProfile(userId, req));
    }
}
