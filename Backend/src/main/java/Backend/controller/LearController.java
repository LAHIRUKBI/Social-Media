package Backend.controller;

import Backend.model.LearModel;
import Backend.repository.LearRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/learn")
@CrossOrigin(origins = "http://localhost:5173")
public class LearController {

    private final LearRepository learRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public LearController(LearRepository learRepository) {
        this.learRepository = learRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<String> addRecipe(
            @RequestParam("recipeName") String recipeName,
            @RequestParam("ingredients") String ingredientsJson,
            @RequestParam("methodSteps") String stepsJson,
            @RequestParam(value = "video", required = false) MultipartFile videoFile
    ) {
        try {
            // Log incoming data
            System.out.println("Received recipeName: " + recipeName);
            System.out.println("Received ingredients: " + ingredientsJson);
            System.out.println("Received methodSteps: " + stepsJson);
    
            LearModel recipe = new LearModel();
            recipe.setRecipeName(recipeName);
    
            // Parse JSON strings to List
            List<String> ingredients = new ObjectMapper().readValue(ingredientsJson, List.class);
            List<String> methodSteps = new ObjectMapper().readValue(stepsJson, List.class);
    
            recipe.setIngredients(ingredients);
            recipe.setMethodSteps(methodSteps);
    
            // Handle file upload
            if (videoFile != null && !videoFile.isEmpty()) {
                String uniqueFileName = UUID.randomUUID() + "_" + videoFile.getOriginalFilename();
                String filePath = uploadDir + File.separator + uniqueFileName;
                File uploadFile = new File(filePath);
    
                // Log file upload details for debugging
                System.out.println("Uploading file to: " + filePath);
                videoFile.transferTo(uploadFile);
    
                recipe.setVideoPath("/uploads/" + uniqueFileName);
            }
    
            learRepository.save(recipe);
            return ResponseEntity.ok("Recipe added successfully!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error uploading video: " + e.getMessage());
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body("Failed to add recipe due to error: " + ex.getMessage());
        }
    }


    @GetMapping
    public ResponseEntity<List<LearModel>> getAllRecipes() {
        try {
            List<LearModel> recipes = learRepository.findAll();
            return ResponseEntity.ok(recipes);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
    
    


    @DeleteMapping("/{id}")
public ResponseEntity<String> deleteRecipe(@PathVariable String id) {
    try {
        learRepository.deleteById(id);
        return ResponseEntity.ok("Recipe deleted successfully!");
    } catch (Exception ex) {
        ex.printStackTrace();
        return ResponseEntity.status(500).body("Error deleting recipe: " + ex.getMessage());
    }
}



@PutMapping("/{id}")
public ResponseEntity<String> updateRecipe(
        @PathVariable String id,
        @RequestParam("recipeName") String recipeName,
        @RequestParam("ingredients") String ingredientsJson,
        @RequestParam("methodSteps") String stepsJson,
        @RequestParam(value = "video", required = false) MultipartFile videoFile,
        @RequestParam(value = "videoPath", required = false) String existingVideoPath
) {
    try {
        LearModel existing = learRepository.findById(id).orElse(null);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        existing.setRecipeName(recipeName);
        List<String> ingredients = new ObjectMapper().readValue(ingredientsJson, List.class);
        List<String> methodSteps = new ObjectMapper().readValue(stepsJson, List.class);
        existing.setIngredients(ingredients);
        existing.setMethodSteps(methodSteps);

        if (videoFile != null && !videoFile.isEmpty()) {
            String uniqueFileName = UUID.randomUUID() + "_" + videoFile.getOriginalFilename();
            String filePath = uploadDir + File.separator + uniqueFileName;
            File uploadFile = new File(filePath);
            videoFile.transferTo(uploadFile);
            existing.setVideoPath("/uploads/" + uniqueFileName);
        } else if (existingVideoPath != null) {
            existing.setVideoPath(existingVideoPath); // Retain old path if no new video
        }

        learRepository.save(existing);
        return ResponseEntity.ok("Recipe updated successfully!");
    } catch (IOException e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("Video upload error: " + e.getMessage());
    } catch (Exception ex) {
        ex.printStackTrace();
        return ResponseEntity.status(500).body("Error: " + ex.getMessage());
    }
}


     
    
}
