import { useState } from 'react';
import './App.css';

function App() {
    // オプションの状態管理
    const [numPages, setNumPages] = useState<number>(50);
    const [numLines, setNumLines] = useState<number>(24);
    const [drawSideLines, setDrawSideLines] = useState<boolean>(false);
    const [drawTopLine, setDrawTopLine] = useState<boolean>(false);
    const [drawLineNumbers, setDrawLineNumbers] = useState<boolean>(false);
    const [lineWeight, setLineWeight] = useState<string>("1px");
    const [lineStyle, setLineStyle] = useState<string>("solid");
    const [lineColor, setLineColor] = useState<string>("#999999");

    // 印刷ダイアログの呼び出し
    const handlePrint = () => {
        window.print();
    };

    // 利用可能な描画領域の高さ(mm)
    const contentHeightMm = 240;
    const rowHeightMm = contentHeightMm / numLines;

    // 左右罫線のCSS設定
    const sideBorder = drawSideLines ? `${lineWeight} ${lineStyle} ${lineColor}` : 'none';

    return (
        <div className="app-container">
            {/* 設定用GUIパネル */}
            <div className="settings-panel">
                <h2>印刷オプション</h2>

                <div className="setting-group">
                    <label>ページ数</label>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        value={numPages}
                        onChange={(e) => setNumPages(Number(e.target.value))}
                    />
                </div>

                <div className="setting-group">
                    <label>行数</label>
                    <input
                        type="number"
                        min="5"
                        max="50"
                        value={numLines}
                        onChange={(e) => setNumLines(Number(e.target.value))}
                    />
                    <div className="setting-info">1行あたりの高さ: {rowHeightMm.toFixed(1)} mm</div>
                </div>

                <div className="setting-group">
                    <label>罫線の太さ</label>
                    <select value={lineWeight} onChange={(e) => setLineWeight(e.target.value)}>
                        <option value="1px">細い (1px)</option>
                        <option value="2px">普通 (2px)</option>
                        <option value="3px">太い (3px)</option>
                    </select>
                </div>

                <div className="setting-group">
                    <label>罫線の種類</label>
                    <select value={lineStyle} onChange={(e) => setLineStyle(e.target.value)}>
                        <option value="solid">実線</option>
                        <option value="dashed">破線</option>
                        <option value="dotted">点線</option>
                    </select>
                </div>

                <div className="setting-group">
                    <label>罫線の色</label>
                    <input
                        type="color"
                        value={lineColor}
                        onChange={(e) => setLineColor(e.target.value)}
                    />
                </div>

                <div className="setting-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={drawSideLines}
                            onChange={(e) => setDrawSideLines(e.target.checked)}
                        />
                        左右に罫線を作る
                    </label>
                </div>

                <div className="setting-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={drawTopLine}
                            onChange={(e) => setDrawTopLine(e.target.checked)}
                        />
                        1行目の上の罫線を入れる
                    </label>
                </div>

                <div className="setting-group">
                    <label>
                        <input
                            type="checkbox"
                            checked={drawLineNumbers}
                            onChange={(e) => setDrawLineNumbers(e.target.checked)}
                        />
                        行番号を作成する
                    </label>
                </div>

                <button className="print-button" onClick={handlePrint}>
                    PDFを作成 (印刷)
                </button>
            </div>

            {/* プレビューエリア */}
            <div className="preview-area">
                {Array.from({ length: numPages }).map((_, pageIndex) => (
                    <div className="paper" key={`page-${pageIndex}`}>
                        <div className="header">
                            <div className="header-left">科目：</div>
                            <div className="header-center">（　　）</div>
                            <div className="header-right">年   月   日</div>
                            <div className="header-bottom-line"></div>
                        </div>

                        <div
                            className="lines-container"
                            style={{
                                borderTop: drawTopLine ? `${lineWeight} ${lineStyle} ${lineColor}` : 'none',
                                borderLeft: sideBorder,
                                borderRight: sideBorder,
                            }}
                        >
                            {Array.from({ length: numLines }).map((_, lineIndex) => (
                                <div
                                    className="line-row"
                                    key={`line-${lineIndex}`}
                                    style={{
                                        borderBottom: `${lineWeight} ${lineStyle} ${lineColor}`,
                                        height: `${rowHeightMm}mm`,
                                    }}
                                >
                                    {drawLineNumbers && (
                                        <div className="line-number">{lineIndex + 1}</div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="footer">{pageIndex + 1}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
