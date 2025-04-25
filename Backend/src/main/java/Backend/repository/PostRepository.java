package Backend.repository;

import Backend.model.Post;
import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByEmail(String email); // Custom query method for fetching posts by email
}
