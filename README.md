# Team Timer

My NSS back-end capstone project, Team Timer is an app developed from necessity. As a coach for a youth triathlon team, I and the other coaches struggled with a way to record athletes' workouts during a training session. Very often we run a workout where all the athletes of a particlar training group start together and complete the same number of laps. Despite utilizing multiple stopwatches, clipboards, and other methods, recording each athlete's lap time, while also trying to convey to each athlete their progress, became frustratingly difficult. Thus, Team Timer was born! (or in reality, thus the other coaches begged me to make something!)

##### _Technologies:_
* AngularJS
* SQLite
* NodeJS
* ExpressJS
* KnexJS
* Angular Material
* Sass
* GreenSock (JS animation library)


More details and screen captures found here:  http://johndhammcodes.com/timer

###### _Features recently added:_
1. Athletes are listed in timer module by average pace (per workout discipline) to help the coach predict next athlete to complete lap.
2. Ability for a coach to select athletes across different groups for a workout, as well as remove athletes from a workout during setup if they are not partaking in the training.
3. Ability for a coach to delete saved workouts that are no longer needed.
4. Timer buttons are now animated to drop down to the bottom of the list each time they are pressed at the end of a lap. This will help coaches when dealing with a large number of athletes participating in the workout as they will not have to search/scroll through timer buttons to find the next athlete completing a lap.
5. Last lap times on timer buttons now changed to reflect pace with standard metric for that discipline. Pace differentials from lap to lap also shown to help coaches gauge an athlete's progress during the workout.


###### _Features to be implemented soon:_
1. Analysis tools (data/charts) for athletes' workouts
