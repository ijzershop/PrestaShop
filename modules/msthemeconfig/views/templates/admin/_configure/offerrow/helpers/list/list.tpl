







{$header}
    <dl class="dl-horizontal">
        <dt>Aanbiedingscode</dt>
        <dd>{$offer.code}</dd>
        <dt>Aanvrager</dt>
        <dd>{$offer.name}</dd>
        <dt>Emailadres</dt>
        <dd>{$offer.email}</dd>
        <dt>Datum aangemaakt</dt>
        <dd>{$offer.date_add|date_format:"%d-%m-%Y"}</dd>
        <dt>Verloop datum</dt>
        <dd>{$offer.date_exp|date_format:"%d-%m-%Y %H:%m"}</dd>
    </dl>

{$content}

{$footer}


