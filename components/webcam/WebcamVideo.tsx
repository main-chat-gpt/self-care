import React from "react";
import Webcam from "react-webcam";
import {UserLesson} from "../../interfaces";


type Props = {
    user: UserLesson;
}

const uploadByteArray = async (recordedChunks, user: UserLesson) => {
    try {
        const response = await fetch('https://shparuta-cache.onrender.com/api/cache/save-lesson', {
            method: 'POST',
            body: recordedChunks,
            headers: {
                'Content-Type': 'application/octet-stream',
                'fileName': new Date().toISOString().replaceAll(":", "-").substring(0, 19),
                'userId': user.userId,
                'userLessonId': user.lessonId
            },
        });

        if (response.ok) {
            console.log('Byte array uploaded successfully.');
        } else {
            console.error('Error uploading byte array:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error uploading byte array:', error);
    }
};

export default function WebcamVideo({user}: Props) {
    const FACING_MODE_USER = "user";
    const FACING_MODE_ENVIRONMENT = "environment";
    const webcamRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [audioEnable, setAudioEnable] = React.useState(true);
    const [recordedChunks, setRecordedChunks] = React.useState([]);


    const handleDataAvailable = React.useCallback(
        ({data}) => {
            if (data.size > 0) {
                uploadByteArray(data, user);
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStartCaptureClick = React.useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef, handleDataAvailable]);

    const handleStopCaptureClick = React.useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, setCapturing]);

    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm",
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            a.click();

            window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: FACING_MODE_USER
    };

    const handleAudioChange = () => {
        setAudioEnable(!audioEnable);
        webcamRef.current.audio = audioEnable;
    };

    const [facingMode, setFacingMode] = React.useState(FACING_MODE_ENVIRONMENT);

    const changeCameraHandler = React.useCallback(() => {
        setFacingMode(
            prevState =>
                prevState === FACING_MODE_USER
                    ? FACING_MODE_ENVIRONMENT
                    : FACING_MODE_USER
        );
    }, []);

    const returnLabel = "<- Назад";
    return (
        <div className="mt-3">

            <h1 className="font-extrabold text-gray-500 md:text-xl text-lg ">Запись видео для урока "{user.lessonName}"</h1>
            <div className="сontainer flex flex-col p-3 m-3">

                <div className="p-1">
                    <a className="w-[80px] bg-blue-gray-300 hover:bg-blue-gray-500 text-white
                font-bold border-2 rounded-2xl m-6 p-2" href="/">{returnLabel}</a>
                    <button
                        className="bg-blue-gray-300 hover:bg-blue-gray-500 text-white
                font-bold border-2 rounded-2xl m-6 p-2"
                        onClick={changeCameraHandler}>Переключить камеру
                    </button>
                </div>
                <Webcam
                    height={400}
                    width={400}
                    audio={true}
                    muted={true}
                    mirrored={true}
                    ref={webcamRef}
                    videoConstraints={{
                        ...videoConstraints,
                        facingMode
                    }}
                />

                <input hidden type="checkbox" checked={audioEnable} onChange={handleAudioChange}/>

                <div className="w-[400px] flex justify-center items-center">
                    {capturing ? (
                        <button className="w-[80px] rounded-full bg-deep-orange-500 hover:bg-deep-orange-700 text-white
                font-bold py-7 hover:shadow-lg m-4"
                                onClick={handleStopCaptureClick}>Стоп</button>
                    ) : (
                        <button className="w-[80px] rounded-full bg-deep-orange-500 hover:bg-deep-orange-700 text-white
                font-bold py-7 hover:shadow-lg m-4" onClick={handleStartCaptureClick}>Старт</button>
                    )}
                    {recordedChunks.length > 0 && (
                        <button className="w-[140px] bg-blue-gray-500 hover:bg-blue-gray-700 text-white font-bold py-2 px-4 rounded-lg
                shadow-lg hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                onClick={handleDownload}>Скачать</button>
                    )}
                </div>
            </div>
        </div>
    );
}
