package Backend.controller;

import Backend.model.Comment;
import Backend.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createComment(@RequestBody Comment commentRequest) {
        try {
            // Validate required fields
            if (commentRequest.getPostId() == null || commentRequest.getPostId().isEmpty()) {
                return ResponseEntity.badRequest().body("Post ID is required");
            }
            
            if (commentRequest.getContent() == null || commentRequest.getContent().isEmpty()) {
                return ResponseEntity.badRequest().body("Comment content is required");
            }
            
            // Build the comment with safe handling of null values
            Comment comment = Comment.builder()
                    .postId(commentRequest.getPostId())
                    .userEmail(commentRequest.getUserEmail() != null ? commentRequest.getUserEmail() : "Anonymous")
                    .content(commentRequest.getContent())
                    .createdAt(LocalDateTime.now())
                    .build();

            Comment savedComment = commentRepository.save(comment);
            return ResponseEntity.ok(savedComment);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Comment creation failed: " + e.getMessage());
        }
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable String postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable String id, @RequestParam String userEmail) {
        return commentRepository.findById(id).map(comment -> {
            // Check if the user is the owner of the comment
            if (!comment.getUserEmail().equals(userEmail)) {
                return ResponseEntity.status(403).body("You can only delete your own comments");
            }
            commentRepository.deleteById(id);
            return ResponseEntity.ok("Comment deleted successfully");
        }).orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(@PathVariable String id, 
                                      @RequestParam String userEmail,
                                      @RequestBody Map<String, String> payload) {
        return commentRepository.findById(id).map(comment -> {
            // Check if the user is the owner of the comment
            if (!comment.getUserEmail().equals(userEmail)) {
                return ResponseEntity.status(403).body("You can only edit your own comments");
            }
            
            String newContent = payload.get("content");
            
            // Update content
            if (newContent == null || newContent.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Comment content cannot be empty");
            }
            
            comment.setContent(newContent);
            Comment updatedComment = commentRepository.save(comment);
            return ResponseEntity.ok(updatedComment);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/post/{postId}")
    public ResponseEntity<?> deleteCommentsByPostId(@PathVariable String postId) {
        commentRepository.deleteByPostId(postId);
        return ResponseEntity.ok("All comments for the post deleted successfully");
    }
}
