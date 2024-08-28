import React from "@rbxts/react";

export default function useSignal<T>(signal: RBXScriptSignal, callback: (...args: unknown[]) => void) {
	React.useEffect(() => {
		const connection = signal.Connect(callback);
		return () => connection.Disconnect();
	}, [signal, callback]);
}
