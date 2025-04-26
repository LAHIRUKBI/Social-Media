package Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private String profileImage;  // New field to store profile image URL

    // Constructors
    public User() {}

    public User(String email, String password, String profileImage) {
        this.email = email;
        this.password = password;
        this.profileImage = profileImage;
    }

    // Getters & Setters
    public String getId() { return id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }
}
