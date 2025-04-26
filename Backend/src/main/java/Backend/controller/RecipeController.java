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
            @RequestParam("email") String email // 🔥 NEW PARAMETER
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
    
        // Save the recipe along with email
        RecipeModel recipe = new RecipeModel(title, ingredients, instructions, imageUrl, email);
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


}
