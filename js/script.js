while (true) {
    var nomeUsuario = prompt("Digite seu nome");
    if (nomeUsuario == null) {
            alert("Porfavor, digite um nome")
        }
        else{
            break;
        }
    }

var input = document.getElementById("msg");

var button = document.getElementById("send");
var delete_button = document.getElementById("delete")
        button.addEventListener("click", function (event) {
            if (input.value != ""){
                enviarMSG();
            }
        });
        addEventListener("keypress", function (event) {
            if (event.key === "Enter"){
                if (input.value != ""){
                    enviarMSG();
                }
        }
    });

        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
        import { getDatabase, ref, set, push, remove, onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

        var firebaseConfig = {
            apiKey: "AIzaSyBaoMKKHycFOvXrRjyqisSWQttxUsafORc",
            authDomain: "projeto-chat-sb.firebaseapp.com",
            projectId: "projeto-chat-sb",
            storageBucket: "projeto-chat-sb.appspot.com",
            messagingSenderId: "538478262881",
            appId: "1:538478262881:web:aeccb52609e9b4bbd4c820",
            measurementId: "G-46LP29EP33"
        };

        const app = initializeApp(firebaseConfig);

        var db = getDatabase(app);
        const dbRef = ref(db, 'exemplo');

        var meuhtml = "";

        function enviarMSG() {

            var datahj = new Date();
            var hora = datahj.getHours() + ":" + datahj.getMinutes() + ":" + datahj.getSeconds()

            push(ref(db, 'exemplo'), {
                nome: nomeUsuario,
                horario: hora,
                data: datahj,
                mensagem: document.getElementById("msg").value
            });

            document.getElementById("msg").value = "";
        }

        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            meuhtml = "";
            snapshot.forEach(function (childSnapshot) {
                var key = childSnapshot.key;
                console.log(key);
                console.log(childSnapshot.val().nome);
                console.log(childSnapshot.val().mensagem);
                console.log(childSnapshot.val().hora)
                
                if (nomeUsuario == childSnapshot.val().nome) {
                    meuhtml += '<div class="msg"><div class="self"><div class="conteudo_eu">' + childSnapshot.val().nome + ' às '+ childSnapshot.val().horario +'</b> </i></b><span></br>' + childSnapshot.val().mensagem + '</span></div></div></div>';        
                }
                else{
                    meuhtml += '<div class="msg"><div class="other"><div class="conteudo">' + childSnapshot.val().nome + ' às '+ childSnapshot.val().horario +'</b> </i></b><span></br>' + childSnapshot.val().mensagem + '</span></div></div></div>';
                }

                
                

            });
            atualizarHTML();
        });

        function atualizarHTML() {
            document.getElementById("conteudo").innerHTML = meuhtml
            ajustarScroll();
        }

        function ajustarScroll() {
            console.log("corrirgir scroll");
            var divConteudo = document.getElementById("conteudo");
            divConteudo.scrollTop = divConteudo.scrollHeight;
        }
