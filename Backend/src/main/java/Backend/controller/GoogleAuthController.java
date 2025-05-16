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
        System.out.println("Starting Google authentication...");
        
        // Verify the token first
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
            new NetHttpTransport(), 
            new GsonFactory()
        )
            .setAudience(Collections.singletonList(googleClientId))
            .build();

        GoogleIdToken idToken = verifier.verify(request.getIdToken());
        if (idToken == null) {
            System.out.println("Token verification failed");
            return ResponseEntity.badRequest().body("Invalid Google ID token.");
        }

        // Get user info from token payload
        GoogleIdToken.Payload payload = idToken.getPayload();
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");

        // Check if user exists
        User user = userRepository.findByEmail(email);
        if (user == null) {
            // Create new user
            user = new User();
            user.setEmail(email);
            user.setName(name);
            user.setPassword("google_auth"); // Dummy password for Google users
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

    } catch (Exception e) {
        System.err.println("Error during Google authentication:");
        e.printStackTrace();
        return ResponseEntity.internalServerError().body("Error during Google authentication: " + e.getMessage());
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