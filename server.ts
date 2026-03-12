import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

const poses = [
    {
        id: 1,
        name: "Mountain Pose",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
        difficulty: "Intermediate",
        instructions: [
            "Stand tall with feet together, shoulders relaxed, weight evenly distributed through your soles, arms at sides.",
            "Take a deep breath and raise your hands overhead, palms facing each other with arms straight.",
            "Reach up toward the sky with your fingertips."
        ],
        benefits: [
            "Improves posture",
            "Strengthens thighs, knees, and ankles",
            "Firms abdomen and buttocks",
            "Relieves sciatica"
        ]
    },
    {
        id: 2,
        name: "Downward Dog",
        image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&w=800&q=80",
        difficulty: "Intermediate",
        instructions: [
            "Come onto your fours. Form a table such that your back forms the table top and your hands and feet form the legs of the table.",
            "As you breathe out lift the hips up, straightening the knees and elbows, form an inverted V-shape with the body.",
            "Hands are shoulder width apart, feet are hip width apart and parallel to each other. Toes point straight ahead."
        ],
        benefits: [
            "Calms the brain and helps relieve stress and mild depression",
            "Energizes the body",
            "Stretches the shoulders, hamstrings, calves, arches, and hands",
            "Strengthens the arms and legs"
        ]
    },
    {
        id: 3,
        name: "Tree Pose",
        image: "https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?auto=format&fit=crop&w=800&q=80",
        difficulty: "Beginner",
        instructions: [
            "Stand tall and straight with arms by the side of your body.",
            "Bend your right knee and place the right foot high up on your left thigh. The sole of the foot should be placed flat and firmly near the root of the thigh.",
            "Make sure that your left leg is straight. Find your balance.",
            "Once you are well balanced, take a deep breath in, gracefully raise your arms over your head from the side, and bring your palms together in 'Namaste' mudra."
        ],
        benefits: [
            "Improves balance and stability in the legs",
            "Strengthens the ligaments and tendon of the feet",
            "Strengthens and tones the entire standing leg, up to the buttocks",
            "Assists the body in establishing pelvic stability"
        ]
    },
    {
        id: 4,
        name: "Warrior Pose",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80",
        difficulty: "Intermediate",
        instructions: [
            "Stand in Mountain Pose. With an exhale, step or lightly jump your feet 3 1/2 to 4 feet apart.",
            "Raise your arms parallel to the floor and reach them actively out to the sides, shoulder blades wide, palms down.",
            "Turn your right foot slightly to the right and your left foot out to the left 90 degrees.",
            "Exhale and bend your left knee over the left ankle, so that the shin is perpendicular to the floor."
        ],
        benefits: [
            "Strengthens and stretches the legs and ankles",
            "Stretches the groins, chest and lungs, shoulders",
            "Stimulates abdominal organs",
            "Increases stamina"
        ]
    },
    {
        id: 5,
        name: "Cobra Pose",
        image: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?auto=format&fit=crop&w=800&q=80",
        difficulty: "Beginner",
        instructions: [
            "Lie prone on the floor. Stretch your legs back, tops of the feet on the floor.",
            "Spread your hands on the floor under your shoulders. Hug the elbows back into your body.",
            "Press the tops of the feet and thighs and the pubis firmly into the floor.",
            "On an inhalation, begin to straighten the arms to lift the chest off the floor, going only to the height at which you can maintain a connection through your pubis to your legs."
        ],
        benefits: [
            "Strengthens the spine",
            "Stretches chest and lungs, shoulders, and abdomen",
            "Firms the buttocks",
            "Stimulates abdominal organs"
        ]
    },
    {
        id: 6,
        name: "Child's Pose",
        image: "https://images.unsplash.com/photo-1532384748853-8f54a8f476e2?auto=format&fit=crop&w=800&q=80",
        difficulty: "Beginner",
        instructions: [
            "Kneel on the floor. Touch your big toes together and sit on your heels, then separate your knees about as wide as your hips.",
            "Exhale and lay your torso down between your thighs.",
            "Broaden your sacrum across the back of your pelvis and narrow your hip points toward the navel, so that they nestle down onto the inner thighs.",
            "Lay your hands on the floor alongside your torso, palms up, and release the fronts of your shoulders toward the floor."
        ],
        benefits: [
            "Gently stretches the hips, thighs, and ankles",
            "Calms the brain and helps relieve stress and fatigue",
            "Relieves back and neck pain when done with head and torso supported"
        ]
    }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API route to get poses
  app.get("/api/poses", (req, res) => {
    res.json(poses);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
