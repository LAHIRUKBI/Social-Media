package Backend.controller;

import Backend.model.LearModel;
import Backend.repository.LearRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
            LearModel recipe = new LearModel();
            recipe.setRecipeName(recipeName);

            // Parse JSON strings to List
            List<String> ingredients = List.of(ingredientsJson.replace("[", "").replace("]", "").replace("\"", "").split(","));
            List<String> methodSteps = List.of(stepsJson.replace("[", "").replace("]", "").replace("\"", "").split(","));

            recipe.setIngredients(ingredients);
            recipe.setMethodSteps(methodSteps);

            // Handle file upload
            if (videoFile != null && !videoFile.isEmpty()) {
                String uniqueFileName = UUID.randomUUID() + "_" + videoFile.getOriginalFilename();
                String filePath = uploadDir + File.separator + uniqueFileName;
                videoFile.transferTo(new File(filePath));
                recipe.setVideoPath("/uploads/" + uniqueFileName);
            }

            learRepository.save(recipe);
            return ResponseEntity.ok("Recipe added successfully!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error uploading video");
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body("Failed to add recipe");
        }
    }
}
