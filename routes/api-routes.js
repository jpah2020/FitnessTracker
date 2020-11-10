//db
const db = require('../models')
module.exports = (app) => {

    //////Workout Routes//////
    //get all
    app.get("/api/workouts/range", (req, res) => {
        db.Workout.find({}).populate("exercises").then (workouts => {
            
            res.json(workouts)
            
        });
    });
    //add excerise, set id, push to model, set true
    app.put("/api/workouts/:workout", async ({ params, body }, res) => {
        const exercise= await db.Exercise.create(body)
        const updatedWorkout=await db.Workout.updateOne({ _id: params.workout},
                                    {$push: {exercises:exercise._id }})
         res.json(updatedWorkout)                           
    });
    //create new workout
    app.post('/api/workouts', (req,res) => {
        db.Workout.create({}).then(newWorkout => {
            res.json(newWorkout);
        });
    });

}