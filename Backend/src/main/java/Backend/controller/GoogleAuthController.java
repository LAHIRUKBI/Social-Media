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
        System.out.println("Received Google login request with token: " + request.getIdToken());
        
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
            new NetHttpTransport(), 
            new GsonFactory()
        )
            .setAudience(Collections.singletonList(googleClientId))
            .build();

        System.out.println("Verifier created with client ID: " + googleClientId);

        GoogleIdToken idToken = verifier.verify(request.getIdToken());
        if (idToken == null) {
            System.out.println("Token verification failed - null token");
            return ResponseEntity.badRequest().body("Invalid Google ID token.");
        }

        GoogleIdToken.Payload payload = idToken.getPayload();
        System.out.println("Token payload: " + payload);
        
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");

        System.out.println("Extracted user info - Email: " + email + ", Name: " + name);

        if (email == null) {
            System.out.println("No email found in token");
            return ResponseEntity.badRequest().body("Email not provided by Google.");
        }

        User user = userRepository.findByEmail(email);
        if (user == null) {
            System.out.println("Creating new user for email: " + email);
            user = new User();
            user.setEmail(email);
            user.setName(name);
            user.setPassword("google_auth");
            user.setProfileImage(pictureUrl);
            user.setAuthProvider("google");
            user = userRepository.save(user);
            System.out.println("New user created: " + user);
        } else if (!"google".equals(user.getAuthProvider())) {
            System.out.println("User exists but with different auth provider");
            return ResponseEntity.badRequest().body("This email is already registered with email/password.");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful with Google!");
        response.put("user", user);
        return ResponseEntity.ok(response);

    } catch (GeneralSecurityException e) {
        System.err.println("Security exception during Google token verification:");
        e.printStackTrace();
        return ResponseEntity.internalServerError().body("Security error during Google authentication.");
    } catch (IOException e) {
        System.err.println("IO exception during Google token verification:");
        e.printStackTrace();
        return ResponseEntity.internalServerError().body("IO error during Google authentication.");
    } catch (Exception e) {
        System.err.println("Unexpected error during Google authentication:");
        e.printStackTrace();
        return ResponseEntity.internalServerError().body("Unexpected error during Google authentication.");
    }
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