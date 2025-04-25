package Backend.controller;

import Backend.model.Post;
import Backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*") // Allow cross-origin requests (adjust according to your needs)
public class PostController {

    @Autowired
    private PostRepository postRepository;

    private final String uploadDir = "uploads/";  // Directory to store uploaded images

    // Endpoint to create a new post
    @PostMapping("/create")
public Post createPost(
        @RequestParam("email") String email,
        @RequestParam("description") String description,
        @RequestParam("images") MultipartFile[] images
) throws IOException {
    List<String> imageUrls = new ArrayList<>();

    for (MultipartFile file : images) {
        if (!file.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            File destination = new File(uploadDir + fileName);
            destination.getParentFile().mkdirs();
            file.transferTo(destination);
            imageUrls.add("http://localhost:8080/uploads/" + fileName);
        }
    }

    Post post = Post.builder()
            .email(email)
            .description(description)
            .imageUrls(imageUrls)
            .likes(0)
            .comments(new ArrayList<>())
            .build();

    return postRepository.save(post);
}


    // Endpoint to get all posts by a user
    @GetMapping("/user")
    public List<Post> getUserPosts(@RequestParam String email) {
        return postRepository.findByEmail(email); // Fetch posts by email
    }

    // Endpoint to get all posts
    @GetMapping("/all")
    public List<Post> getAllPosts() {
        return postRepository.findAll(); // Fetch all posts from the database
    }

   // Endpoint to like a post
@PostMapping("/like/{id}")
public Post likePost(@PathVariable String id) {  // Change Long to String here
    Post post = postRepository.findById(id).orElseThrow();
    post.setLikes(post.getLikes() + 1); // Increment the like count
    return postRepository.save(post); // Save the updated post
}

// Endpoint to add a comment to a post
@PostMapping("/comment/{id}")
public Post addComment(@PathVariable String id, @RequestBody String comment) {  // Change Long to String here
    Post post = postRepository.findById(id).orElseThrow();
    post.getComments().add(comment); // Add the new comment to the post
    return postRepository.save(post); // Save the updated post
}

}
