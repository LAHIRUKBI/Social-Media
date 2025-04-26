package Backend.controller;

import Backend.model.User;
import Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email already exists!";
        }
        userRepository.save(user);
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public String loginUser(@RequestBody User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser == null) {
            return "User not found!";
        }
        if (!existingUser.getPassword().equals(user.getPassword())) {
            return "Invalid password!";
        }
        return "Login successful!";
    }

    @PostMapping("/updateProfileImage")
    public String updateProfileImage(@RequestParam String email, @RequestParam String profileImage) {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            user.setProfileImage(profileImage);
            userRepository.save(user);
            return "Profile image updated successfully!";
        }
        return "User not found!";
    }
}
