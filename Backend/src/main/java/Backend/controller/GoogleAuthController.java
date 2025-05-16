package Backend.controller;

import Backend.model.User;
import Backend.repository.UserRepository;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

@RestController
@RequestMapping("/api/auth/google")
public class GoogleAuthController {

    @Autowired
    private UserRepository userRepository;

    @Value("${google.client.id}")
    private String googleClientId;

    @PostMapping("/login")
    public String googleLogin(@RequestBody String idTokenString) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new GsonFactory())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                
                String email = payload.getEmail();
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");

                User user = userRepository.findByEmail(email);
                if (user == null) {
                    user = new User();
                    user.setEmail(email);
                    user.setPassword("google_auth");
                    user.setProfileImage(pictureUrl);
                    user.setAuthProvider("google");
                    userRepository.save(user);
                    return "User registered and logged in successfully with Google!";
                } else {
                    return "Login successful with Google!";
                }
            } else {
                return "Invalid Google ID token.";
            }
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
            return "Google authentication failed: " + e.getMessage();
        }
    }
}