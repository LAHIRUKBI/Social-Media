package Backend.controller;

import Backend.model.User;
import Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth/google")
public class GoogleAuthController {

    private static final Logger logger = LoggerFactory.getLogger(GoogleAuthController.class);

    @Autowired
    private UserRepository userRepository;

    @Value("${google.client.id}")
    private String googleClientId;




    @PostMapping("/login")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> request) {
        try {
            logger.info("Received Google login request");
            
            String email = request.get("email");
            String name = request.get("name");
            String picture = request.get("picture");

            if (email == null || email.isEmpty()) {
                logger.error("Missing email in request");
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Missing email"
                ));
            }

            logger.info("Processing user with email: {}", email);
            
            // Check if user exists
            User user = userRepository.findByEmail(email);
            if (user == null) {
                logger.info("Registering new Google user: {}", email);
                // Register new user
                user = new User();
                user.setEmail(email);
                user.setName(name);
                user.setPassword("google_auth");
                user.setProfileImage(picture);
                user.setAuthProvider("google");
                userRepository.save(user);
            } else if (!"google".equals(user.getAuthProvider())) {
                logger.error("Email {} already registered with password", email);
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "error", "Email already registered with password"
                ));
            }

            Map<String, Object> response = Map.of(
            "success", true,
            "message", "Authentication successful",
            "user", Map.of(
                "email", user.getEmail(),
                "name", user.getName(),
                "profileImage", user.getProfileImage()
            )
            );
            
            logger.info("Google authentication successful for user: {}", email);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error during Google authentication", e);
        return ResponseEntity.internalServerError().body(Map.of(
            "success", false,
            "error", "Internal server error: " + (e.getMessage() != null ? e.getMessage() : "Unknown error")
            ));
        }
    }
}