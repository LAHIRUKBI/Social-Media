package Backend.controller;

import Backend.model.User;
import Backend.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth/google")
public class GoogleAuthController {

    @Autowired
    private UserRepository userRepository;

    @Value("${google.client.id}")
    private String googleClientId;

@PostMapping("/login")
public ResponseEntity<?> googleLogin(@RequestBody GoogleAuthRequest request) {
    try {
        // Detailed logging
        System.out.println("Received Google auth request");
        System.out.println("Token: " + request.getIdToken());
        System.out.println("Using Client ID: " + googleClientId);

        // Verify token exists
        if (request.getIdToken() == null || request.getIdToken().isEmpty()) {
            return ResponseEntity.badRequest().body(
                Map.of("success", false, "error", "Missing Google token")
            );
        }

        // Initialize verifier
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
            new NetHttpTransport(), 
            new GsonFactory()
        )
            .setAudience(Collections.singletonList(googleClientId))
            .build();

        // Verify token
        GoogleIdToken idToken = verifier.verify(request.getIdToken());
        if (idToken == null) {
            return ResponseEntity.badRequest().body(
                Map.of("success", false, "error", "Invalid Google token")
            );
        }

        // Extract payload
        GoogleIdToken.Payload payload = idToken.getPayload();
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");

        // Verify required fields
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body(
                Map.of("success", false, "error", "Email not provided in Google token")
            );
        }

        // Check/create user
        User user = userRepository.findByEmail(email);
        if (user == null) {
            user = new User();
            user.setEmail(email);
            user.setName(name != null ? name : "Google User");
            user.setPassword("google_auth");
            user.setProfileImage(pictureUrl);
            user.setAuthProvider("google");
            user = userRepository.save(user);
        } else if (!"google".equals(user.getAuthProvider())) {
            return ResponseEntity.badRequest().body(
                Map.of("success", false, "error", "Email already registered with password")
            );
        }

        // Successful response
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Authentication successful",
            "user", Map.of(
                "email", user.getEmail(),
                "name", user.getName(),
                "profileImage", user.getProfileImage()
            )
        ));

    } catch (GeneralSecurityException | IOException e) {
        System.err.println("Google auth verification failed:");
        e.printStackTrace();
        return ResponseEntity.status(500).body(
            Map.of("success", false, "error", "Token verification failed")
        );
    } catch (Exception e) {
        System.err.println("Unexpected error during Google auth:");
        e.printStackTrace();
        return ResponseEntity.internalServerError().body(
            Map.of("success", false, "error", "Internal server error")
        );
    }
}

private ResponseEntity<?> handleUserRegistration(GoogleAuthRequest request) {
    String email = request.getEmail();
    String name = request.getName();
    String pictureUrl = request.getPicture();

    if (email == null || email.isEmpty()) {
        return ResponseEntity.badRequest().body("Email not provided");
    }

    User user = userRepository.findByEmail(email);
    if (user == null) {
        // Register new user
        user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setPassword("google_auth");
        user.setProfileImage(pictureUrl);
        user.setAuthProvider("google");
        user = userRepository.save(user);
        
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registration successful with Google! Please login.");
        response.put("user", user);
        return ResponseEntity.ok(response);
    } else if (!"google".equals(user.getAuthProvider())) {
        return ResponseEntity.badRequest()
            .body("This email is already registered. Please login with your password.");
    }

    // For existing Google users
    Map<String, Object> response = new HashMap<>();
    response.put("message", "Login successful with Google!");
    response.put("user", user);
    return ResponseEntity.ok(response);
}

    static class GoogleAuthRequest {
        private String idToken;
        private String email;
        private String name;
        private String picture;
        
        // Getters and setters
        public String getIdToken() { return idToken; }
        public void setIdToken(String idToken) { this.idToken = idToken; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getPicture() { return picture; }
        public void setPicture(String picture) { this.picture = picture; }
    }
}