export const validCPF = (string) => {
    let cpf = string.replace(/\D/g, '');
    if (cpf.toString().length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    var result = true;
    [9, 10].forEach(function (j) {
        var soma = 0, r;
        cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
            soma += parseInt(e) * ((j + 2) - (i + 1));
        });
        r = soma % 11;
        r = (r < 2) ? 0 : 11 - r;
        if (r !== cpf.substring(j, j + 1)) result = false;
    });
    return result;
}

export const formatCpf = (value) => {
    if (value === null || value === undefined) return ''
    let cnpjCpf = value.replace(/\D/g, '');
    if (cnpjCpf.length > 11) cnpjCpf = cnpjCpf.slice(0, 11)
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
}