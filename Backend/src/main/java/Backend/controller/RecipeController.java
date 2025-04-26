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
            @RequestParam(value = "image", required = false) MultipartFile image
    ) {
        String imageUrl = null;

        if (image != null && !image.isEmpty()) {
            try {
                // Clean file name to prevent directory traversal
                String fileName = StringUtils.cleanPath(image.getOriginalFilename());
                String uploadPath = uploadDir + File.separator + fileName;
                
                // Create directories if not exist
                Files.createDirectories(Paths.get(uploadDir));
                
                // Save file
                image.transferTo(new File(uploadPath));

                // Image URL will be something like /uploads/filename.jpg
                imageUrl = "/uploads/" + fileName;

            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).body("Image upload failed!");
            }
        }

        // Save the recipe to the MongoDB database
        RecipeModel recipe = new RecipeModel(title, ingredients, instructions, imageUrl);
        recipeRepository.save(recipe);

        return ResponseEntity.ok("Recipe added successfully!");
    }
}
