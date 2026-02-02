// Klasa do renderowania harmonogramu spłat
export class ScheduleRenderer {
    static render(schedule, title, compareSchedule = null, overpaymentValue = 0) {
        let tableHeaders = `<tr><th>Nr</th>`;
        if (!compareSchedule) tableHeaders += `<th>Data</th>`;
        tableHeaders += `<th>Rata</th>`;
        if (compareSchedule && overpaymentValue > 0) tableHeaders += `<th>Nadpłata</th>`;
        tableHeaders += `<th>Kapitał</th><th>Odsetki</th><th>Saldo</th>`;
        if (compareSchedule) tableHeaders += `<th>Różnica w odsetkach</th>`;
        tableHeaders += `</tr>`;

        let html = `<h3>${title}</h3><table>${tableHeaders}`;
        schedule.forEach((r, index) => {
            let row = `<tr><td>${r.nr}</td>`;
            if (!compareSchedule) row += `<td>${r.date}</td>`;
            row += `<td>${r.payment}</td>`;
            if (compareSchedule && overpaymentValue > 0) {
                let capitalNoOver = compareSchedule[index] ? parseFloat(compareSchedule[index].capital) : 0;
                let nadplata = (parseFloat(r.payment) - capitalNoOver - parseFloat(r.interest));
                if (nadplata < 0) nadplata = 0;
                row += `<td>${nadplata.toFixed(2)}</td>`;
            }
            row += `<td>${r.capital}</td><td>${r.interest}</td><td>${r.balance}</td>`;
            if (compareSchedule && index < compareSchedule.length) {
                const diff = (parseFloat(compareSchedule[index].interest) - parseFloat(r.interest)).toFixed(2);
                const diffColor = diff > 0 ? 'color: #28a745;' : 'color: #dc3545;';
                row += `<td style="${diffColor}">${diff} zł</td>`;
            }
            row += '</tr>';
            html += row;
        });
        html += '</table>';
        return html;
    }
}
