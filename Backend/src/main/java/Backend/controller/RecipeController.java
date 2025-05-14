package Backend.controller;

import Backend.model.RecipeModel;
import Backend.repository.RecipeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Value("${upload.path:uploads}")
    private String uploadPath;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @PostMapping("/add")
    public ResponseEntity<?> addRecipe(
            @RequestParam("title") String title,
            @RequestParam("ingredients") String ingredientsJson,
            @RequestParam("instructions") String instructionsJson,
            @RequestParam("email") String email,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        try {
            // Parse JSON strings
            List<Map<String, String>> ingredients = objectMapper.readValue(ingredientsJson, new TypeReference<>() {});
            List<Map<String, String>> instructions = objectMapper.readValue(instructionsJson, new TypeReference<>() {});

            String imagePath = null;

            // Save the image if it exists
            if (imageFile != null && !imageFile.isEmpty()) {
                String fileExtension = StringUtils.getFilenameExtension(imageFile.getOriginalFilename());
                String fileName = UUID.randomUUID().toString() + "." + fileExtension;
                File dir = new File(uploadPath);
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                String fullPath = uploadPath + File.separator + fileName;
                Files.write(Paths.get(fullPath), imageFile.getBytes());
                imagePath = fullPath;
            }

            // Save to DB
            RecipeModel recipe = new RecipeModel();
            recipe.setTitle(title);
            recipe.setEmail(email);
            recipe.setIngredients(ingredients);
            recipe.setInstructions(instructions);
            recipe.setImagePath(imagePath);

            recipeRepository.save(recipe);

            return ResponseEntity.ok("Recipe saved successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error saving recipe: " + e.getMessage());
        }
    }

    @GetMapping("/byEmail")
    public ResponseEntity<?> getRecipesByEmail(@RequestParam("email") String email) {
        try {
            List<RecipeModel> recipes = recipeRepository.findByEmail(email);
            return ResponseEntity.ok(recipes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to retrieve recipes");
        }
    }
}
