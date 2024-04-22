import React, { useEffect } from "react";

const GoogleTranslate = () => {
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            { pageLanguage: "en", includedLanguages: "bn,hi" },
            "google_translate_element"
        );
        const googleDropdown = document.querySelector(".goog-te-combo");
        if (googleDropdown) {
            googleDropdown.style.display = "none";
        }

        // Remove one of the "Powered by Google Translate" attributions
        const attributionElements =
            document.querySelectorAll(".goog-te-gadget");
        if (attributionElements.length >= 2) {
            attributionElements[1].parentNode.removeChild(
                attributionElements[1]
            );
        }
    };

    useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
            "src",
            "http://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

    return (
        <>
            <div id="google_translate_element"></div>
        </>
    );
};

export default GoogleTranslate;
