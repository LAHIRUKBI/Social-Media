package Backend.repository;

import Backend.model.RecipeModel;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends MongoRepository<RecipeModel, String> {
    List<RecipeModel> findByEmail(String email);

}
