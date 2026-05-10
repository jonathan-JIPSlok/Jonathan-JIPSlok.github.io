/*******************************************************************************************
 * Obejtivo: adicionar projetos direto no index a partir de dados de um JSON
 * Autor: Jonathan Yuri Poli Siqueira
 * Data: 10/05/2026
 * Versão: 2.0 Beta
 *******************************************************************************************/

import { JsonArray } from "../data/JsonProjects.js";

const getProjectsForArray = function (array, funcaoDestino) {
    array.forEach(projeto => {
        funcaoDestino(projeto);
    });
}

const createCardProject = function (project) {
    let sectionProjects = document.getElementById("sectionProjetos");

    //Criando elementos
    let divCard = document.createElement("div");
    let h3Projeto = document.createElement("h3");
    let divVideoProjeto = document.createElement("div");
    let pDescricaoProjeto = document.createElement("p");
    let buttonSaibaMais = document.createElement("button");
    let iframe;

    
    if (project.videoPitch != null) {
        iframe = document.createElement("iframe");
        iframe.setAttribute("src", project.videoPitch);
        iframe.setAttribute("title", project.titulo);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allow", "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
        iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    } else {
        iframe = document.createElement("div");
    }
    //Adcionando atributos aos elementos criados
    divCard.setAttribute("class", "divCard");
    h3Projeto.setAttribute('class', 'h3Projeto');
    divVideoProjeto.setAttribute("class", "divVideoProjeto");
    pDescricaoProjeto.setAttribute("class", "pDescricaoProjeto");
    buttonSaibaMais.setAttribute("class", "buttonSaibaMaisProjeto");

    //Adicionando texto
    h3Projeto.innerText = project.titulo
    pDescricaoProjeto.innerText = project.descricao
    buttonSaibaMais.innerText = "saiba mais"

    divCard.appendChild(h3Projeto);
    divVideoProjeto.appendChild(iframe);
    divCard.appendChild(divVideoProjeto);
    divCard.appendChild(pDescricaoProjeto);
    divCard.appendChild(buttonSaibaMais);
    sectionProjects.appendChild(divCard);
}

window.addEventListener('load', function () {
    getProjectsForArray(JsonArray, createCardProject);
})