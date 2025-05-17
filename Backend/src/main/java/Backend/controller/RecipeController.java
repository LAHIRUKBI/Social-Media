package Backend.controller;

import Backend.model.RecipeModel;
import Backend.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:5173") // Ensure this matches your frontend URL
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;







@PostMapping("/add")
public ResponseEntity<String> addRecipe(
        @RequestParam("title") String title,
        @RequestParam("ingredients") String ingredients,
        @RequestParam("instructions") String instructions,
        @RequestParam(value = "image", required = false) MultipartFile image,
        @RequestParam("email") String email,
        @RequestParam(value = "cookingTime", required = false) String cookingTime,
        @RequestParam(value = "difficulty", required = false) String difficulty
) {
    String imageUrl = null;
    
    if (image != null && !image.isEmpty()) {
        try {
            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            String uploadPath = uploadDir + File.separator + fileName;
            Files.createDirectories(Paths.get(uploadDir));
            image.transferTo(new File(uploadPath));
            imageUrl = "/uploads/" + fileName;
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Image upload failed!");
        }
    }
    
    RecipeModel recipe = new RecipeModel(title, ingredients, instructions, imageUrl, email, cookingTime, difficulty);
    recipeRepository.save(recipe);
    
    return ResponseEntity.ok("Recipe added successfully!");
}









@GetMapping("/user")
public ResponseEntity<?> getRecipesByUser(@RequestParam String email) {
    try {
        return ResponseEntity.ok(recipeRepository.findByEmail(email));
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error fetching user's recipes!");
    }
}







@GetMapping("/all")
public ResponseEntity<?> getAllRecipes() {
    try {
        return ResponseEntity.ok(recipeRepository.findAll());
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error fetching all recipes!");
    }
}








@PutMapping("/{id}")
public ResponseEntity<String> updateRecipe(
        @PathVariable String id,
        @RequestParam("title") String title,
        @RequestParam("ingredients") String ingredients,
        @RequestParam("instructions") String instructions,
        @RequestParam("email") String email,
        @RequestParam("cookingTime") String cookingTime,
        @RequestParam("difficulty") String difficulty,
        @RequestParam(value = "image", required = false) MultipartFile image,
        @RequestParam(value = "imageUrl", required = false) String imageUrl
) {
    try {
        RecipeModel existing = recipeRepository.findById(id).orElse(null);
        if (existing == null) return ResponseEntity.status(404).body("Recipe not found");

        existing.setTitle(title);
        existing.setIngredients(ingredients);
        existing.setInstructions(instructions);
        existing.setEmail(email);
        existing.setCookingTime(cookingTime);
        existing.setDifficulty(difficulty);

        if (image != null && !image.isEmpty()) {
            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            String uploadPath = uploadDir + File.separator + fileName;
            Files.createDirectories(Paths.get(uploadDir));
            image.transferTo(new File(uploadPath));
            existing.setImageUrl("/uploads/" + fileName);
        } else if (imageUrl != null) {
            existing.setImageUrl(imageUrl);
        }

        recipeRepository.save(existing);
        return ResponseEntity.ok("Recipe updated successfully!");
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Update failed: " + e.getMessage());
    }
}







@DeleteMapping("/{id}")
public ResponseEntity<String> deleteRecipe(@PathVariable String id) {
    System.out.println("Attempting to delete recipe with ID: " + id); // DEBUG
    try {
        // Check if recipe exists first
        if (!recipeRepository.existsById(id)) {
            return ResponseEntity.status(404).body("Recipe not found");
        }
        
        recipeRepository.deleteById(id);
        return ResponseEntity.ok("Recipe deleted successfully!");
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Failed to delete recipe!");
    }
}



}
