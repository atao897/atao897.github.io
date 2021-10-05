// import { QRCode  } from "qrcode";
var QRCode = require("qrcode");
import "./receiver.css";
import { KeypadPeer } from "./keypadPeer.js";

class Receiver extends KeypadPeer {
  constructor(keypadParameters, onDataCallback) {
    super({ targetElementId: keypadParameters.targetElementId });
    keypadParameters = this.#verifyKeypadParameters(keypadParameters);

    this.onDataCallback = onDataCallback; // What to do on a button-press
    this.alphabet = this.checkAlphabet(keypadParameters["alphabet"]); // What symbols to display on the keys
    this.font = keypadParameters["font"]; // What fontface to display the symbols in

    /* Set up callbacks that handle any events related to our peer object. */
    this.peer.on("open", this.#onPeerOpen); // On creation of Receiver (local) Peer object
    this.peer.on("connection", this.#onPeerConnection); // On connection with Keypad (remote) Peer object
    this.peer.on("disconnected", this.onPeerDisconnected);
    this.peer.on("close", this.onPeerClose);
    this.peer.on("error", this.onPeerError);
  }

  updateAlphabet = (alphabet) => {
    // Get an array of unique symbols
    const validAlphabet = this.checkAlphabet(alphabet);
    this.displayUpdate("New alphabet: " + String(validAlphabet), true); // DEBUG

    this.alphabet = validAlphabet; // Store new alphabet

    try {
      this.conn.send({ 
        message: "Update",
        alphabet: validAlphabet,
        font: this.font,
        peerID: this.peer.id
       });
    } catch (e) {
      this.displayUpdate("Error in updating alphabet! ", e); // DEBUG 
      console.error(e);
    }
  };
  updateFont = (font) => {
    // TODO check if the font is supported, somehow
    console.log("font: ", font);
    console.log("alphabet: ", this.alphabet);

    this.font = font; // Store new font

    try {
      this.conn.send({ 
        message: "Update",
        font: font,
        alphabet: this.alphabet,
        peerID: this.peer.id
      });
    } catch (e) {
      this.displayUpdate("Error in updating font! "); // DEBUG 
      console.error(e);
    }
  };
  #verifyKeypadParameters = (keypadParameters) => {
    if (!keypadParameters.hasOwnProperty("alphabet")) {
      console.error(
        "Must provide 'alphabet' parameter to Receiver object. Defaulting to 'CDHKNORSVZ'"
      );
      keypadParameters["alphabet"] = "CDHKNORSVZ".split("");
    } else {
      keypadParameters["alphabet"] = this.checkAlphabet(keypadParameters.alphabet);
    }
    if (!keypadParameters.hasOwnProperty("font")) {
      console.error(
        "Must provide 'font' parameter to Receiver object. Defaulting to 'Sloan'"
      );
      keypadParameters["alphabet"] = "Sloan";
    } else {
      // FUTURE verify that the selected font is available
    }
    return keypadParameters;
  };
  #onPeerOpen = (id) => {
    // Workaround for peer. ect deleting previous id
    if (this.id === null) {
      this.displayUpdate("Received null id from peer open"); // DEBUG
      this.peer.id = this.lastPeerId;
    } else {
      this.lastPeerId = this.peer.id;
    }

    const params = {
      // alphabet: this.alphabet,
      // font: this.font,
      peerID: this.peer.id,
    };

    let queryString = this.queryStringFromObject(params);
    const uri = this.keypadUrl + queryString;
    console.log(uri);

    // Display QR code for the participant to scan
    const qrCanvas = document.createElement("canvas");

    QRCode.toCanvas(qrCanvas, uri, function (error) {
      if (error) console.error(error);
    });

    // Store encoding of QR code, eg to use as an image source
    this.qrURI = qrCanvas.toDataURL();

    if (!!document.getElementById(this.targetElement)) {
      document.getElementById(this.targetElement).appendChild(qrCanvas);
    } else {
      console.log("Peer reachable at: ", uri);
    }
  };
  #onPeerConnection = (connection) => {
    // Allow only a single connection
    if (this.conn && this.conn.open) {
      connection.on("open", function () {
        connection.send({
          message: "Rejected", 
          info: "Already connected to another client"});
        setTimeout(function () {
          connection.close();
        }, 500);
      });
      return;
    }
    this.conn = connection;
    console.log("Connection: ", connection);
    this.displayUpdate("Keypad Successfully Loaded! ");
    this.#ready();
  };
  #ready = () => {
    /*
     * Triggered once a connection has been achieved.
     * Defines callbacks to handle incoming data and connection events.
     */
    // Perform callback with data
    this.conn.on("data", (data) => {
      data = data; // data = JSON.parse(data);
      console.log("Received data: ", data);
      switch (data.message) {
        case "Handshake":
          this.conn.send({
            message: "KeypadParameters",
            alphabet: this.alphabet,
            font: this.font,
          });
          break;
        case "Keypress":
          this.onDataCallback(data);
          break;
        default:
          console.log("Message type: ", data.message);
      }
    });
    this.conn.on("close", () => {
      this.displayUpdate("Connection reset. Awaiting connection...");
      this.conn = null;
    });
  };
}
/* 
Referenced links:
https://stackoverflow.com/questions/28016664/when-you-pass-this-as-an-argument/28016676#28016676
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
*/

export { Receiver };
