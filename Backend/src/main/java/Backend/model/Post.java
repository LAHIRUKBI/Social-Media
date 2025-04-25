package Backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;

    private String email;  // User's email who is creating the post

    @Column(length = 1000)
    private String description;  // Post description

    @ElementCollection
    private List<String> imageUrls;  // List of image URLs

    private int likes;  // Number of likes for the post

    @ElementCollection
    private List<String> comments;  // List of comments on the post
}
