import { useEffect, useState } from "react";
import "./App.css";

interface recipe {
  ingredients: string[];
  directions: string[];
}

const tempData = {
  ingredients: [
    "2 ½ cups all-purpose flour",
    "1 teaspoon salt",
    "1 cup (2 sticks) unsalted butter, cold and cut into ½-inch pieces",
    "½ cup ice water",
    "6-8 medium apples (preferably a mix of sweet and tart, like Honeycrisp, Granny Smith, Fuji, or Gala), peeled, cored, and sliced ¼-inch thick",
    "½ cup granulated sugar (adjust to apple sweetness)",
    "¼ cup packed light brown sugar",
    "2 tablespoons all-purpose flour",
    "1 teaspoon ground cinnamon",
    "¼ teaspoon ground nutmeg",
    "⅛ teaspoon ground cloves (optional)",
    "1 tablespoon fresh lemon juice",
    "1 tablespoon unsalted butter, cut into small pieces",
    "1 large egg, beaten",
    "1 tablespoon turbinado sugar (for sprinkling)",
  ],
  directions: [
    "In a large bowl, whisk together the flour and salt. Add the cold butter pieces and cut them into the flour using a pastry blender or your fingertips until the mixture resembles coarse crumbs with some pea-sized butter chunks remaining.",
    "Gradually add the ice water, 1 tablespoon at a time, mixing until the dough just comes together. Be careful not to overmix. Divide the dough in half, flatten each half into a disk, wrap tightly in plastic wrap, and refrigerate for at least 30 minutes (or up to 2 days).",
    "Preheat your oven to 425°F (220°C).",
    "In a large bowl, combine the sliced apples, granulated sugar, brown sugar, flour, cinnamon, nutmeg, cloves (if using), and lemon juice. Toss gently until the apples are evenly coated.",
    "On a lightly floured surface, roll out one disk of dough into a 12-inch circle. Carefully transfer the dough to a 9-inch pie plate. Trim the edges, leaving about a 1-inch overhang.",
    "Pour the apple filling into the pie crust, mounding it slightly in the center. Dot the top of the filling with the small pieces of butter.",
    "Roll out the second disk of dough into another 12-inch circle. You can place this over the filling as a solid top crust, cut it into strips for a lattice top, or cut out decorative shapes.",
    "If making a solid top crust, place it over the filling. Trim the edges, leaving about a 1-inch overhang. Press the top and bottom crusts together to seal, then crimp the edges decoratively using your fingers or a fork. Cut several slits in the top crust to allow steam to escape.",
    "If making a lattice top, cut the dough into 1-inch wide strips. Weave them over the apples in a lattice pattern. Trim the ends and press them to the bottom crust, crimping the edges.",
    "In a small bowl, whisk the egg with 1 teaspoon of water to create an egg wash. Brush the top crust evenly with the egg wash and sprinkle with turbinado sugar.",
    "Place the pie on a baking sheet (to catch any drips). Bake for 15 minutes at 425°F (220°C).",
    "Reduce the oven temperature to 375°F (190°C) and continue baking for another 45-60 minutes, or until the crust is golden brown and the filling is bubbly and tender when pierced with a knife. If the crust starts browning too quickly, loosely tent the pie with aluminum foil.",
    "Remove the pie from the oven and let it cool on a wire rack for at least 2-3 hours before slicing and serving. This allows the filling to set properly.",
  ],
};

function formatItems(items: string[]) {
  return (
    <div>
      {items.map((item) => (
        <div>{item}</div>
      ))}
    </div>
  );
}

function App() {
  const [url, setUrl] = useState("");
  const [recipe, setRecipe] = useState<recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRecipe(tempData);
  }, []);

  //debounce set url
  function handleChange(inputURL: string) {
    const handler = setTimeout(() => {
      console.log("set url");
      setUrl(inputURL);
    }, 200);
    return () => clearTimeout(handler);
  }

  // const sendURL = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("Submitting URL:", url);
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch("http://localhost:3000/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ url }),
  //     });

  //     if (!response.ok) {
  //       console.error("Backend returned error:", response.status);
  //       return;
  //     }

  //     const recipeText = await response.json();

  //     if (recipeText.reply.ingredients && recipeText.reply.directions) {
  //       setRecipe(recipeText.reply);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch recipe:", error);
  //   }
  //   setIsLoading(false);
  // };

  return (
    <div>
      <form>
        <label htmlFor="url">input url</label>
        <input
          type="text"
          id="url"
          name="url"
          onChange={(e) => {
            // handleChange(e.target.value);
          }}
        />
      </form>
      <div>{recipe?.ingredients && formatItems(recipe?.ingredients)}</div>
      <div>{recipe?.directions && formatItems(recipe?.directions)}</div>

      <div>{isLoading && "LOAD"}</div>
    </div>
  );
}

export default App;
