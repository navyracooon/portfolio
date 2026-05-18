export default function ResearchPage() {
  return (
    <main className="page-shell inner-page">
      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Research</p>
          <h1 className="page-title">数値計算・制御・最適化を独立した強みにする</h1>
          <p className="lede">
            Web 開発とは別軸の技術的背景として，トカマク炉心プラズマの温度分布制御を題材に，問題設定，物理モデルの理解，数値シミュレーション，制御設計，最適化，結果の評価までを扱っています．
          </p>
        </div>

        <div className="research-grid">
          <article className="detail-card">
            <h2>Numerical simulation</h2>
            <p>
              統合輸送コード TASK を用いて，トカマク炉心プラズマの温度分布と電流分布の時間発展を計算します．入力条件を変えながら，定常状態，周期振動，計算破綻の境界を整理します．
            </p>
          </article>

          <article className="detail-card">
            <h2>Control</h2>
            <p>
              中心電子温度 Te0 と規格化温度勾配 g を制御指標として設定し，コア加熱入力とエッジ加熱入力を用いて温度分布の定常点追従を行います．
            </p>
          </article>

          <article className="detail-card">
            <h2>Optimization</h2>
            <p>
              PID ゲインと入力混合係数を CMA-ES により探索し，複数の目標値パターンに対して安定に追従できる制御器を構成します．
            </p>
          </article>

          <article className="detail-card">
            <h2>Analysis</h2>
            <p>
              入力空間と制御量空間の両方から到達可能領域を調べ，ITB の形成・非形成を分ける操作条件を推定します．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Bachelor thesis</p>
          <h2>トカマク炉心プラズマの分布制御のシミュレーション研究</h2>
          <p className="lede">
            学士論文では，核融合炉の有力な方式であるトカマクを対象に，炉心プラズマの温度分布を制御するための基礎的な設計指針を検討しました．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Research question</h2>
            <p>
              炉心プラズマの温度分布や密度分布は，エネルギー閉じ込め性能と安定性に強く影響します．特に内部輸送障壁，すなわち ITB が形成されると閉じ込め性能は改善されますが，圧力勾配が急峻になり，MHD 不安定性のリスクも高まります．
            </p>
            <p>
              この研究では，ITB が形成されない領域で温度分布を制御するために，ITB の形成・非形成を分ける制御操作条件を明らかにすることを目的としました．
            </p>
          </article>

          <article className="detail-card">
            <h2>Approach</h2>
            <p>
              温度分布を直接すべて制御するのではなく，中心電子温度 Te0 と規格化温度勾配 g を代表的な分布指標として扱いました．Te0 は加熱入力条件を，g は温度分布の形状を反映する指標です．
            </p>
            <p>
              入力にはコア加熱入力 Pcore とエッジ加熱入力 Pedge の 2 系統を用い，それぞれの加熱条件に対して TASK による輸送シミュレーションを実行しました．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Modeling</p>
          <h2>制御対象をどう定義したか</h2>
          <p className="lede">
            物理現象をそのまま扱うのではなく，制御設計で扱える形に指標化し，入力，出力，制約，到達可能領域として整理しています．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Outputs</h2>
            <ul className="detail-list">
              <li>中心電子温度 Te0</li>
              <li>規格化温度勾配 g</li>
              <li>定常状態に到達したかどうか</li>
              <li>周期振動が発生したかどうか</li>
              <li>シミュレーションが破綻したかどうか</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Inputs</h2>
            <ul className="detail-list">
              <li>コア加熱入力 Pcore</li>
              <li>エッジ加熱入力 Pedge</li>
              <li>入力範囲は 1 MW から 20 MW を基本とする</li>
              <li>開ループ解析では格子状に入力を掃引する</li>
              <li>閉ループ制御では入力制約を課して非定常領域への侵入を抑える</li>
            </ul>
          </article>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Temperature profile indicator</h2>
            <p>
              規格化温度勾配 g は，温度分布の局所的な揺らぎの影響を抑えるため，ρ = 0.31 から ρ = 0.51 の区間平均に基づいて定義しました．これにより，温度分布の形状変化を制御指標として扱いやすくしています．
            </p>
          </article>

          <article className="detail-card">
            <h2>Simulation environment</h2>
            <p>
              輸送計算には TASK/TR を用い，入力ファイルの生成，シミュレーション実行，出力抽出，結果整理を Python インターフェースから扱えるようにしました．既存の科学計算コードを制御実験の対象として扱うための周辺実装も研究の一部です．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Open-loop analysis</p>
          <h2>入力掃引による動作点の同定</h2>
          <p className="lede">
            制御器を設計する前に，どの入力条件なら定常状態に到達できるのか，どの条件で ITB 振動や計算破綻が起きるのかを調べました．
          </p>
        </div>

        <div className="timeline-list">
          <article className="timeline-item">
            <span>Step 1</span>
            <h2>入力を固定して時間発展を計算する</h2>
            <p>
              Pcore と Pedge を一定値に固定し，最大 300 秒間の輸送シミュレーションを実行しました．10 秒間値が変化しない状態を定常状態として扱います．
            </p>
          </article>

          <article className="timeline-item">
            <span>Step 2</span>
            <h2>定常マップを作る</h2>
            <p>
              各入力条件に対して Te0 と g の定常値を取得し，入力空間上にマップとして整理しました．これにより，安定に使える入力範囲と非定常領域の境界を可視化しました．
            </p>
          </article>

          <article className="timeline-item">
            <span>Step 3</span>
            <h2>周期振動を判定する</h2>
            <p>
              定常に到達しないケースについては，自己相関関数を用いて周期性を判定しました．周期的な変動が見られるケースでは，ITB の形成と消失を繰り返す振動状態に入っていると解釈しました．
            </p>
          </article>

          <article className="timeline-item">
            <span>Step 4</span>
            <h2>制御に使う入力制約を導く</h2>
            <p>
              定常に到達できる入力範囲を近似し，閉ループ制御で用いる入力制約を設定しました．この制約は単なる安全策ではなく，定常点追従を成立させるための前提条件として機能します．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Control design</p>
          <h2>分布指標の同時制御</h2>
          <p className="lede">
            開ループ解析で得られた入力制約と到達可能領域を前提に，Te0 と g の同時制御を行いました．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>PID control</h2>
            <p>
              Te0 と g に対してそれぞれ PID 制御器を用意し，出力された制御量をコア加熱入力とエッジ加熱入力に配分します．2 つの入力は 2 つの出力に独立に作用するわけではないため，入力混合係数を導入しています．
            </p>
          </article>

          <article className="detail-card">
            <h2>CMA-ES</h2>
            <p>
              PID ゲインと入力混合係数は手作業で調整するのではなく，CMA-ES によって探索しました．目的関数には Te0 と g の平均絶対誤差を用い，g の追従性能を重視するために重みを大きく設定しています．
            </p>
          </article>
        </div>

        <div className="research-grid">
          <article className="detail-card">
            <h2>Pattern A</h2>
            <p>
              定常境界を段階的になぞる目標値を設定し，Te0 と g がともに安定して追従できることを確認しました．
            </p>
          </article>

          <article className="detail-card">
            <h2>Pattern B</h2>
            <p>
              到達可能領域の内部を移動する目標値に対して，概ね良好な追従が成立しました．一方で，入力制約を外すと周期振動や計算破綻が生じやすくなりました．
            </p>
          </article>

          <article className="detail-card">
            <h2>Pattern C</h2>
            <p>
              到達可能領域外に目標値を設定すると，同時追従が崩れ，制御量が領域内または境界付近へ戻る挙動が見られました．
            </p>
          </article>

          <article className="detail-card">
            <h2>Pattern D</h2>
            <p>
              Te0 を維持したまま g を領域外へ上げる目標を設定した場合も，g の追従は成立せず，到達可能領域を超えた定常制御が難しいことを確認しました．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Results</p>
          <h2>得られた結果</h2>
          <p className="lede">
            この研究では，温度分布そのものを直接扱うのではなく，制御に使える指標と到達可能領域を整理することで，分布制御の設計指針を得ました．
          </p>
        </div>

        <div className="timeline-list">
          <article className="timeline-item">
            <span>Finding 1</span>
            <h2>ITB 形成・非形成を分ける入力条件を推定した</h2>
            <p>
              開ループ入力掃引により，定常状態に到達する領域，周期振動が発生する領域，計算が破綻する領域を整理しました．これにより，ITB 形成を避けた温度分布制御に使える操作条件を推定しました．
            </p>
          </article>

          <article className="timeline-item">
            <span>Finding 2</span>
            <h2>到達可能領域内では定常点追従が成立した</h2>
            <p>
              Te0 と g の目標値を到達可能領域内に設定した場合，PID 制御と CMA-ES により得られたパラメータで安定した追従が確認されました．
            </p>
          </article>

          <article className="timeline-item">
            <span>Finding 3</span>
            <h2>入力制約の重要性を確認した</h2>
            <p>
              入力制約を外すと，ITB 振動に対応する周期的な変動や，数値計算の破綻が発生しやすくなりました．この結果から，入力制約は制御を安定に保つための本質的な条件だと分かります．
            </p>
          </article>

          <article className="timeline-item">
            <span>Finding 4</span>
            <h2>領域外目標への追従は困難だった</h2>
            <p>
              到達可能領域外に目標値を設定した場合，Te0 と g の同時追従は維持できず，実際の動作点は到達可能領域の境界付近へ戻る傾向が見られました．
            </p>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Technical strengths</p>
          <h2>研究で扱った技術</h2>
          <p className="lede">
            研究内容そのものに加えて，既存コードの扱い，数値実験の自動化，制御器の設計，結果の評価までを一連の実装として扱っています．
          </p>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Problem formulation</h2>
            <ul className="detail-list">
              <li>複雑な物理現象を制御問題として定式化する</li>
              <li>制御対象，入力，出力，制約を整理する</li>
              <li>直接観測しにくい現象を指標で扱う</li>
              <li>到達可能領域をもとに目標値を設計する</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Implementation</h2>
            <ul className="detail-list">
              <li>FORTRAN ベースの既存シミュレーションコードを扱う</li>
              <li>Python による実行管理と結果抽出を行う</li>
              <li>大量の入力条件を自動で掃引する</li>
              <li>時系列データから定常性と周期性を判定する</li>
            </ul>
          </article>
        </div>

        <div className="detail-columns">
          <article className="detail-card">
            <h2>Control and optimization</h2>
            <ul className="detail-list">
              <li>PID 制御器を設計する</li>
              <li>複数入力・複数出力の干渉を入力混合係数で扱う</li>
              <li>CMA-ES により制御パラメータを最適化する</li>
              <li>入力制約を満たすように操作量を投影する</li>
            </ul>
          </article>

          <article className="detail-card">
            <h2>Evaluation</h2>
            <ul className="detail-list">
              <li>定常状態，周期振動，計算破綻を分類する</li>
              <li>制御履歴と入力履歴を比較して評価する</li>
              <li>到達可能領域内外で制御結果を比較する</li>
              <li>今後の課題を物理指標と制御対象の両面から整理する</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="panel detail-panel">
        <div className="section-heading">
          <p className="eyebrow">Future work</p>
          <h2>今後の課題</h2>
          <p className="lede">
            本研究では ITB を避ける側の温度分布制御を中心に扱いました．今後は，ITB そのものを定量的に評価し，形成・維持・崩壊を制御対象として扱うことが課題です．
          </p>
        </div>

        <div className="research-grid">
          <article className="detail-card">
            <h2>ITB indicator</h2>
            <p>
              本研究では ITB の形成を直接表す指標を導入できていないため，定常に到達しなかったケースを結果的に ITB 形成として整理しています．今後は ITB 形成をより直接的に捉える指標が必要です．
            </p>
          </article>

          <article className="detail-card">
            <h2>ITB control</h2>
            <p>
              ITB を避けるだけでなく，ITB を形成し，維持し，必要に応じて抑制する制御へ拡張する余地があります．
            </p>
          </article>

          <article className="detail-card">
            <h2>More profiles</h2>
            <p>
              温度分布だけでなく，密度分布，電流分布，安全係数分布なども含めた多変数の分布制御へ拡張することが考えられます．
            </p>
          </article>

          <article className="detail-card">
            <h2>Transition analysis</h2>
            <p>
              定常状態と ITB 振動状態の境界を，入力空間だけでなく制御量空間から整理することで，非定常領域への遷移条件をより明確にできる可能性があります．
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
