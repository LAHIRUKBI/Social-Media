package Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.*;
import java.util.List;

@Document(collection = "posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Post {
    @Id
    private String id;
    private String email;
    private String description;
    private List<String> imageUrls;
    private int likes;
    private List<String> likedBy;
    private List<Comment> comments;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Comment {
        private String userId;
        private String text;
    }
}