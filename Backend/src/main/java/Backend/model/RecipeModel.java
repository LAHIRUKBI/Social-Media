package Backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Map;

@Document(collection = "recipes")
public class RecipeModel {
    @Id
    private String id;
    private String title;
    private String email;
    private List<Map<String, String>> ingredients;
    private List<Map<String, String>> instructions;
    private String imagePath;

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public List<Map<String, String>> getIngredients() { return ingredients; }
    public void setIngredients(List<Map<String, String>> ingredients) { this.ingredients = ingredients; }

    public List<Map<String, String>> getInstructions() { return instructions; }
    public void setInstructions(List<Map<String, String>> instructions) { this.instructions = instructions; }

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }
}
