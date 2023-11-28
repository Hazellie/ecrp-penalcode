export async function fetchPenalCode() : Promise<string[]> {
    const url = "https://gov.eclipse-rp.net/viewtopic.php?t=105513"

    const response = await fetch(url);


    if (response.status !== 200) {
        console.error(`${url}: ${response.status} - ${response.statusText}`)
        throw Error()
    }

    const body = await response.text()

    let topics = body.split('<div class="postbody">')

    for (let i = 1; i < topics.length; i++) {
        topics[i] = topics[i].split('<div class="notice">')[0].split('<div class="back2top">')[0].replace(/(<([^>]+)>)/gi, '').replace(/&amp;/g, '').replace(/ +/g, ' ').split('\n').slice(16).join('\n') // Big mess, extracts out just the text from each topic for easier comparison.
        Bun.write(`${i}`, topics[i])
    }
    return topics
}