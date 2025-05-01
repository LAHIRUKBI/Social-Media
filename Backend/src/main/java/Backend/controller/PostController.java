package Backend.controller;

import Backend.model.Post;
import Backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    private final String uploadDir = "G:/PAFPROJECT/Backend/uploads/";

    @PostMapping("/create")
    public ResponseEntity<?> createPost(
            @RequestParam("email") String email,
            @RequestParam("description") String description,
            @RequestParam("images") MultipartFile[] images
    ) {
        try {
            File folder = new File(uploadDir);
            if (!folder.exists()) folder.mkdirs();
    
            List<String> imageUrls = new ArrayList<>();
    
            for (MultipartFile file : images) {
                if (!file.isEmpty()) {
                    String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                    File destination = new File(uploadDir + fileName);
                    file.transferTo(destination);
                    imageUrls.add("http://localhost:8080/uploads/" + fileName);
                    System.out.println("Saved file to: " + destination.getAbsolutePath());
                } else {
                    return ResponseEntity.badRequest().body("One or more images are empty");
                }
            }
    
            Post post = Post.builder()
                    .email(email)
                    .description(description)
                    .imageUrls(imageUrls)
                    .likes(0)
                    .comments(new ArrayList<>())
                    .build();
    
            Post savedPost = postRepository.save(post);
            System.out.println("Saved post: " + savedPost);
            return ResponseEntity.ok(savedPost);
    
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Post creation failed: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // Log any other error
            return ResponseEntity.status(500).body("Post creation failed: " + e.getMessage());
        }
    }
    


    @GetMapping("/user")
    public List<Post> getUserPosts(@RequestParam String email) {
        return postRepository.findByEmail(email);
    }

    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @PutMapping("/like/{postId}")
public ResponseEntity<?> toggleLike(@PathVariable String postId, @RequestParam String userEmail) {
    return postRepository.findById(postId).map(post -> {
        if (post.getLikedBy() == null) post.setLikedBy(new ArrayList<>());

        List<String> likedBy = post.getLikedBy();
        if (likedBy.contains(userEmail)) {
            likedBy.remove(userEmail);
            post.setLikes(post.getLikes() - 1);
        } else {
            likedBy.add(userEmail);
            post.setLikes(post.getLikes() + 1);
        }

        post.setLikedBy(likedBy);
        postRepository.save(post);
        return ResponseEntity.ok(post);
    }).orElse(ResponseEntity.notFound().build());
}


    @PostMapping("/comment/{id}")
    public Post addComment(@PathVariable String id, @RequestBody String comment) {
        Post post = postRepository.findById(id).orElseThrow();
        post.getComments().add(comment);
        return postRepository.save(post);
    }

    @PutMapping("/update/{id}")
public ResponseEntity<?> updatePost(@PathVariable String id, 
                                    @RequestParam(required = false) String description,
                                    @RequestParam(required = false) MultipartFile[] images) {
    Post post = postRepository.findById(id).orElseThrow(() -> new RuntimeException("Post not found"));

    // Update post description
    if (description != null) {
        post.setDescription(description);
    }

    // Handle new images if any (remove old images and add new ones)
    if (images != null && images.length > 0) {
        List<String> imageUrls = new ArrayList<>();
        File folder = new File(uploadDir);
        if (!folder.exists()) folder.mkdirs();

        // Remove old images (or clear the list)
        post.setImageUrls(new ArrayList<>());

        // Save new images
        for (MultipartFile file : images) {
            if (!file.isEmpty()) {
                String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
                File destination = new File(uploadDir + fileName);
                try {
                    file.transferTo(destination);
                    imageUrls.add("http://localhost:8080/uploads/" + fileName);
                } catch (IOException e) {
                    return ResponseEntity.status(500).body("Error saving images: " + e.getMessage());
                }
            }
        }

        // Add the new images to the post's imageUrls
        post.setImageUrls(imageUrls);
    }

    // Save the updated post to the repository
    Post savedPost = postRepository.save(post);
    return ResponseEntity.ok(savedPost);
}



@DeleteMapping("/delete/{id}")
public ResponseEntity<?> deletePost(@PathVariable String id) {
    System.out.println("Received delete request for ID: " + id);
    if (!postRepository.existsById(id)) {
        System.out.println("Post not found with ID: " + id);
        return ResponseEntity.notFound().build();
    }
    postRepository.deleteById(id);
    return ResponseEntity.ok("Post deleted successfully");
}



}