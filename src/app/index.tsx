import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
};

function ActionButton({ label, onPress }: ButtonProps) {
  return (
    <Pressable
      style={styles.button}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

type PracticeTrackerProps = {
  solved: number;
  onSolve: () => void;
  onReset: () => void;
};

function PracticeTracker({ solved, onSolve, onReset }: PracticeTrackerProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Practice Tracker</Text>

      <Text style={styles.counter}>Solved: {solved}</Text>

      {solved >= 5 && <Text style={styles.success}>Great job!</Text>}

      <ActionButton label="Solve +1" onPress={onSolve} />
      <ActionButton label="Reset" onPress={onReset} />
    </View>
  );
}

function useStopwatch(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return seconds;
}

type StopwatchProps = {
  seconds: number;
  isRunning: boolean;
};

function Stopwatch({ seconds, isRunning }: StopwatchProps) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(remainingSeconds).padStart(2, "0")}`;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Lab Stopwatch</Text>
      <Text style={styles.timer}>{formattedTime}</Text>
      <Text style={styles.status}>{isRunning ? "Running…" : "Paused"}</Text>
    </View>
  );
}

export default function LabScreen() {
  const [solved, setSolved] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const seconds = useStopwatch(isRunning);

  const handleSolve = () => {
    setSolved((s) => s + 1);
  };

  const handleReset = () => {
    setSolved(0);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Lab Timer</Text>
        <Text style={styles.subtitle}>Track your practice and study time</Text>

        <PracticeTracker
          solved={solved}
          onSolve={handleSolve}
          onReset={handleReset}
        />

        <Stopwatch seconds={seconds} isRunning={isRunning} />

        <View style={styles.controls}>
          <ActionButton label="Start" onPress={handleStart} />
          <ActionButton label="Stop" onPress={handleStop} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F6FC",
  },
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: 36,
    justifyContent: "center",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#173B70",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#5D6B82",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginBottom: 18,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#173B70",
    marginBottom: 14,
  },
  counter: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#26364B",
    textAlign: "center",
    marginBottom: 12,
  },
  success: {
    color: "#16834A",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  timer: {
    fontSize: 46,
    fontWeight: "bold",
    color: "#173B70",
    textAlign: "center",
    marginVertical: 8,
  },
  status: {
    fontSize: 16,
    color: "#5D6B82",
    textAlign: "center",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2459A9",
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  controls: {
    marginBottom: 24,
  },
});
