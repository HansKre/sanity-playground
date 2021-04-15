import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

export default class FormattingPreview extends React.Component {
    static propTypes = {
        value: PropTypes.object
    }

    getEmbedCode(value) {
        const htmlFrom = (htmlString) => {
            const cleanHtmlString = DOMPurify.sanitize(htmlString, { USE_PROFILES: { html: true } });
            const html = parse(cleanHtmlString);
            return html;
        }

        return (<>
            {value.title && htmlFrom(value.title)}
            {value.title && <br />}
            {value.subtitle && <span>{value.subtitle}</span>}
        </>)
    }

    render() {
        const { value } = this.props
        return (
            <div style={{ minHeight: '2em' }}>
                {this.getEmbedCode(value)}
            </div>
        )
    }
}