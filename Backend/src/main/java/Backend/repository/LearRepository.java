package Backend.repository;

import Backend.model.LearModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LearRepository extends MongoRepository<LearModel, String> {
}
