import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class DecreeComponent extends Component {
  @tracked decrees;

  @action
  async loadDecrees() {
    const url = `https://codex.opendata.api.vlaanderen.be:8888/sparql?default-graph-uri=https%3A%2F%2Fdata.vlaanderen.be%2Fns%2Fwetgeving&query=PREFIX+rdf%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%3E%0D%0APREFIX+rdfs%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0D%0APREFIX+eli%3A+%3Chttp%3A%2F%2Fdata.europa.eu%2Feli%2Fontology%23%3E%0D%0A%0D%0ASELECT+DISTINCT+%3Ftype+%3Fdate+%3Fdocuments+%3Ftitle+%3Fconcat+WHERE+%7B%0D%0A%3Fs+eli%3Atype_document+%3Ftype+.%0D%0AFILTER%28%3Ftype+%3D+%3Chttps%3A%2F%2Fdata.vlaanderen.be%2Fid%2Fconcept%2FAardWetgeving%2FDecreet%3E%29%0D%0A%3Fs+eli%3Adate_document+%3Fdate+.%0D%0A%3Fs+eli%3Ais_realized_by+%3Fdocuments+.%0D%0A%3Fdocuments+eli%3Atitle+%3Ftitle+.%0D%0ABIND%28concat%28%3Fdate%2C+%22+-+%22%2C+%3Ftitle%29+AS+%3Fconcat%29%0D%0A%7D+ORDER+BY+DESC%28%3Fdate%29+LIMIT+5&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on`;
    const response = await fetch(url, {
      headers: { Accept: 'application/sparql-results+json' },
    });
    const decisions = await response.json();
    const data = decisions.results.bindings;
    let decrees = [];
    for (const element of data) {
      decrees.push(element.concat.value);
    }
    this.decrees = decrees;
  }
}
