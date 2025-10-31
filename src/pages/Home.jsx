import CurrentlyReading from '../components/CurrentlyReading';
import WorkoutTracker from '../components/WorkoutTracker';
import CoursesBuilt from '../components/CoursesBuilt';
import GitHubProjects from '../components/GitHubProjects';

function Home() {
  return (
    <>
      <div className="full-width-widget">
        <CoursesBuilt />
      </div>

      <div className="full-width-widget">
        <GitHubProjects />
      </div>

      <main className="widgets">
        <CurrentlyReading />
      </main>

      <div className="full-width-widget">
        <WorkoutTracker />
      </div>
    </>
  );
}

export default Home;
